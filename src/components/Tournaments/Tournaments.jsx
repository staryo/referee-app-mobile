import { RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";
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
              <View style={{
                flexDirection: "row",
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "white",
                padding: 10,
                width: "100%",
                justifyContent: "space-between",
                borderRadius: 5,
                margin: 5,
              }}
                    key={row.id}>
                <View style={{
                  flex: 3,
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
                      moment(row.createdAt).format('L')
                    }
                  </Text>
                </View>
              </View>
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
    backgroundColor: "#15202b",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 0,
    width: "100%",
    paddingHorizontal: 10,
  },
  scrollView: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
