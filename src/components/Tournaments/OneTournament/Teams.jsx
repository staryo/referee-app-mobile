import { ScrollView, StyleSheet, View } from "react-native";
import { FAB, Text } from "@rneui/themed";


export default function Teams({ navigation, title, teamsList, tournamentId }) {
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollView}
      >

        {teamsList
          .sort((a, b) => (a.team_name > b.team_name) ? 1 : -1)
          .map((row, index) => (
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
            ),
          )}
      </ScrollView>
      <FAB placement="right" icon={{ name: "add", color: "white" }} onPress={() => {
        navigation.navigate("New Team", { title, tournamentId })
      }}/>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    margin: 0,
  },
});
