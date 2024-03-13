import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { FAB, Text } from "@rneui/themed";
import moment from "moment/moment";
import { useState } from "react";


export default function Matches(params) {

  const { navigation, title, matchesList, tournamentId, teamsList } = params

  const [refreshing, setRefreshing] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.container}>

        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {}}/>}
        >

          {matchesList
            .sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1)
            .map((row) => (
                <TouchableOpacity key={row.id} onPress={
                  () => navigation.navigate(
                    "Match",
                    { title: row.name, matchId: row.id },
                  )
                }>
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 10,
                      width: "100%",
                      justifyContent: "space-between",
                      height: 70,
                    }}
                  >
                    <View style={{
                      flex: 2,
                      height: "100%",
                      justifyContent: "center",
                    }}>
                      <Text h4 style={{ color: "white" }}>
                        {row.name}
                      </Text>
                    </View>
                    <View style={{
                      flex: 1,
                      height: "100%",
                      justifyContent: "center",
                    }}>
                      <Text h4 style={{ color: "white" }}>
                        {moment(row.createdAt).format("L")}
                      </Text>
                    </View>

                  </View>
                </TouchableOpacity>
              ),
            )}
        </ScrollView>
      </SafeAreaView>
      <FAB placement="right" icon={{ name: "add", color: "white" }} onPress={() => {
        navigation.navigate("New Match", { title, tournamentId, teamsList })
      }}/>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#15202b",
    justifyContent: "flex-start",
    width: "100%",
    margin: 0,
    padding: 0,
  },
  scrollView: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    margin: 0,
  },
});
