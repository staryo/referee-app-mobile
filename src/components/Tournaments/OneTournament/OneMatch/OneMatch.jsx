import { SafeAreaView, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { getMatch } from "../../../../api/matches";
import Timer from "./Timer";
import { Text } from "@rneui/themed";
import Results from "./Results";


export default function OneMatch({ navigation, route }) {
  const { matchId } = route.params;
  const [match, setMatch] = useState({})

  useEffect(() => {
    getMatch({ id: matchId }).then((res) => {
      setMatch(res)
    })
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.flexRow}>
          <Text style={styles.count}>
            {match?.team1count}
          </Text>
          <Text style={styles.count}>
            -
          </Text>
          <Text style={styles.count}>
            {match?.team2count}
          </Text>
        </View>

        {
          match?.match?.current_period + (match?.match?.is_period_completed ? 1 : 0)
          <= match?.match?.tournament?.default_number_of_periods
            ? <Timer navigation={navigation} match={match} setMatch={setMatch}/>
            : ""
        }
        <Results match={match} setMatch={setMatch}/>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15202b",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  count: {
    color: "white",
    fontSize: 100
  },
  flexRow: {
    flexDirection: "row",
    gap: 10
  }
});
