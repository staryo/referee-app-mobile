import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { FAB, Text } from "@rneui/themed";
import { useState } from "react";


export default function Teams({ navigation, title, teamsList, tournamentId }) {
  const [refreshing, setRefreshing] = useState(false);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {
          }}/>}
        >

          {teamsList
            .sort((a, b) => (a.team_name > b.team_name) ? 1 : -1)
            .map((row, index) => (
                <TouchableOpacity key={row.id} onPress={
                  () => navigation.navigate(
                    "Team",
                    { title: row.team_name, teamId: row.id },
                  )
                }>
                  <View
                    key={row.id}
                    style={{
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
                      height: 70,
                    }}
                  >
                    <View style={{
                      flex: 1,
                      height: "100%",
                      justifyContent: "center",
                    }}>
                      <Text h4 style={{ color: "white" }}>
                        {index + 1}
                      </Text>
                    </View>
                    <View style={{
                      flex: 2,
                      height: "100%",
                      justifyContent: "center",
                    }}>
                      <Text h4 style={{ color: "white" }}>
                        {row.team_name}
                      </Text>
                    </View>

                  </View>
                </TouchableOpacity>
              ),
            )}
        </ScrollView>
      </SafeAreaView>
      <FAB placement="right" icon={{ name: "add", color: "white" }} onPress={() => {
        navigation.navigate("New Team", { title, tournamentId })
      }}/>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#15202b",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  scrollView: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    margin: 0,
  },
});
