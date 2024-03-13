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
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={{ color: "white", fontSize: 100 }}>
            {match?.team1count}
          </Text>
          <Text style={{ color: "white", fontSize: 100 }}>
            -
          </Text>
          <Text style={{ color: "white", fontSize: 100 }}>
            {match?.team2count}
          </Text>
        </View>

        {
          match?.match?.current_period + (match?.match?.is_period_completed ? 1 : 0)
          <= match?.match?.tournament?.default_number_of_periods
            ? <Timer match={match} setMatch={setMatch}/>
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
});
