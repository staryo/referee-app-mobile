import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { getAllTournaments } from "../../api/tournaments";
import { FAB, Text } from "@rneui/themed";
import moment from "moment";


export default function Tournaments({ navigation, route }) {

  const { check } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [tournaments, setTournaments] = useState([])

  useEffect(() => {
    setRefreshing(true)
    getAllTournaments().then((res) => {
      setTournaments(res)
      setRefreshing(false)
    })
  }, [check]);

  const onRefresh = () => {
    setRefreshing(true)
    getAllTournaments().then((res) => {
      setTournaments(res)
      setRefreshing(false)
    })
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>

          {tournaments.map((row) => (
              <TouchableOpacity key={row.id} onPress={
                () => navigation.navigate(
                  "Tournament",
                  { title: row.name, tournamentId: row.id },
                )
              }>
                <View style={{
                  flexDirection: "row",
                  borderStyle: "solid",
                  borderWidth: 0,
                  borderColor: "white",
                  padding: 10,
                  width: "100%",
                  justifyContent: "space-between",
                  borderRadius: 0,
                  marginVertical: 1,
                  marginHorizontal: 0,
                  backgroundColor: "#15202b",
                  height: 70
                }}>
                  <View style={{
                    flex: 3,
                    height: "100%",
                    justifyContent: "center",
                  }}>
                    <Text h4 style={{ color: "white" }}>
                      {row.name}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "column", flex: 1 }}>
                    <Text style={{ color: "white" }}>
                      {row.sport_name}
                    </Text>
                    <Text style={{ color: "white", fontStyle: "italic" }}>
                      {
                        moment(row.createdAt).format("L")
                      }
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ),
          )}
        </ScrollView>

        <FAB placement="right" icon={{ name: "add", color: "white" }} onPress={() => {
          navigation.navigate("New Tournament")
        }}/>

      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    margin: 0,
    padding: 0
  },
  scrollView: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    margin: 0
  },
});
