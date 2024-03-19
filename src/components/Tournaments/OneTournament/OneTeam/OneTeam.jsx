import { SafeAreaView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Players from "./Players";
import { getTeam } from "../../../../api/teams";


export default function OneTeam({ navigation, route }) {
  const { teamId, title, check } = route.params;
  const [team, setTeam] = useState([])

  useEffect(() => {
    getTeam({ id: teamId }).then((res) => {
      setTeam(res)
    })
  }, [check]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Players
          navigation={navigation}
          title={title}
          playersList={team.players || []}
          teamId={teamId}
        />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15202b",
    justifyContent: "flex-start",
    width: "100%",
  },
});
