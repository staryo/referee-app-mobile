import { SafeAreaView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getTournament } from "../../../api/tournaments";
import { ButtonGroup } from "@rneui/themed";
import Teams from "./Teams";
import Matches from "./Matches";


export default function OneTournament({ navigation, route }) {
  const { tournamentId, title, check } = route.params;
  const [tournament, setTournament] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    getTournament({ id: tournamentId }).then((res) => {
      setTournament(res)
    })
  }, [check]);


  return (
    <>
      <SafeAreaView style={styles.container}>
        <ButtonGroup
          buttons={["MATCHES", "TEAMS"]}
          buttonStyle={{
            backgroundColor: "#343a40",
            borderRadius: 10,
          }}
          textStyle={{
            color: "white",
          }}
          buttonContainerStyle={{
            borderColor: "black",
            borderRadius: 10,
          }}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
          }}
          containerStyle={{
            marginVertical: 10,
            borderWidth: 0,
            gap: 5,
            backgroundColor: "#15202b",
          }}
        />
        {
          selectedIndex === 0
            ? <Matches
              navigation={navigation}
              title={title}
              matchesList={tournament.matches || []}
              tournamentId={tournamentId}
              teamsList={tournament.teams || []}
            />
            : ""
        }
        {
          selectedIndex === 1
            ? <Teams
              navigation={navigation}
              title={title}
              teamsList={tournament.teams || []}
              tournamentId={tournamentId}
            />
            : ""
        }

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
