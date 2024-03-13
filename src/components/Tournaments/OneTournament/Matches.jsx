import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { FAB, Text } from "@rneui/themed";
import moment from "moment/moment";


export default function Matches(params) {

  const { navigation, title, matchesList, tournamentId, teamsList } = params

  return (
    <>

      <ScrollView
        contentContainerStyle={styles.scrollView}
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
      <FAB placement="right" icon={{ name: "add", color: "white" }} onPress={() => {
        navigation.navigate("New Match", { title, tournamentId, teamsList })
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
