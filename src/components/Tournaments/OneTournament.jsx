import { SafeAreaView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getTournament } from "../../api/tournaments";
import { ButtonGroup } from "@rneui/themed";


export default function OneTournament({ navigation, route }) {
  const { tournamentId } = route.params;
  const [tournament, setTournament] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    getTournament({ id: tournamentId }).then((res) => {
      setTournament(res)
    })
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ButtonGroup
          buttons={["MATCHES", "PLAYERS", "TOURNAMENT"]}
          buttonStyle={{
            backgroundColor: "#343a40",
            borderRadius: 10
          }}
          textStyle={{
            color: "white"
          }}
          buttonContainerStyle={{
            borderColor: "black",
            borderRadius: 10
          }}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
          }}
          containerStyle={{
            marginVertical: 10,
            borderWidth: 0,
            gap: 10,
            backgroundColor: "#15202b"
          }}
        />

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
