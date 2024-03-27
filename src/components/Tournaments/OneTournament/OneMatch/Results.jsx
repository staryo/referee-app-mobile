import { Text } from "@rneui/themed";
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";
import { getMatch } from "../../../../api/matches";

export default function Results({ match, setMatch }) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true)
    getMatch({ id: match?.match?.id }).then((res) => {
      setMatch(res)
      setRefreshing(false)
    })
  }

  const events = (match?.match?.events || [])
    .sort((a, b) => a.period + a.time > b.period + b.time ? -1 : 1)
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text h3 style={{ color: "white", marginVertical: 10, alignSelf: "center" }}> Match results </Text>
        <ScrollView contentContainerStyle={styles.scrollView} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>

          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 15, flex: 1 }}>
              Period
            </Text>
            <Text style={{ color: "white", fontSize: 15, flex: 1 }}>
              Time
            </Text>
            <Text style={{ color: "white", fontSize: 15, flex: 2 }}>
              Team
            </Text>
            <Text style={{ color: "white", fontSize: 15, flex: 2 }}>
              Author
            </Text>

          </View>
          {
            events.map((goal) => {
              const author = goal.players.filter((player) => player.event_player.is_author)[0]
                return (
                  <View key={goal.id} style={{ flexDirection: "row" }}>
                    <Text style={{ color: "white", fontSize: 15, flex: 1 }}>
                      {goal.period}
                    </Text>
                    <Text style={{ color: "white", fontSize: 15, flex: 1 }}>
                      {goal.time.split(':').splice(1,2).join(":")}
                    </Text>
                    <Text style={{ color: "white", fontSize: 15, flex: 2 }}>
                      {goal.team_number === 1 ? match.match.team1.team_name : match.match.team2.team_name}
                    </Text>
                    <Text style={{ color: "white", fontSize: 15, flex: 2 }}>
                      {author?.first_name[0]}{author ? "." : ""} {author?.last_name}
                    </Text>
                  </View>
                )
              },
            )
          }
        </ScrollView>
      </SafeAreaView>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#15202b",
    justifyContent: "flex-start",
    width: "90%",
    margin: 0,
    padding: 0,
  },
  scrollView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    margin: 0,
  },
});
