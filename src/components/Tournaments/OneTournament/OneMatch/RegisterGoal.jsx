import { Alert, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { Button, Text } from "@rneui/themed";
import { SelectList } from "react-native-dropdown-select-list"
import Icon from "react-native-vector-icons/FontAwesome";
import { createEvent } from "../../../../api/events";
import { getTeam } from "../../../../api/teams";

export default function RegisterGoal({ navigation, route }) {

  const { matchId, period, time, teamNumber, teamId } = route.params;

  const [loadingState, setLoadingState] = useState(false);
  const [author, setAuthor] = useState(undefined)
  const [players, setPlayers] = useState([])
  const [teamName, setTeamName] = useState(undefined)

  useEffect(() => {
    getTeam({ id: teamId }).then((res) => {
      setTeamName(res?.team_name)
      setPlayers(res?.players)
    })
  }, [teamId])

  const handleCreate = async () => {
    setLoadingState(true);
    try {
      await createEvent({ matchId, goalAuthorId: author, time, period, teamNumber, assistAuthorId: 0 });
      navigation.navigate(
        "Match",
        { matchId, check: Math.floor(Math.random() * 100) },
      )
    } catch (error) {
      Alert.alert(`Error ${error}`);
    }
    setLoadingState(null);
  };

  const data = players.map((row) => {
    return {
      key: row.id,
      value: `${row.first_name} ${row.last_name}`,
    }
  })

  return (
    <View style={styles.container}>
      <Text h4 style={{ color: "white", marginTop: 15 }}>
        {teamName}
      </Text>
      <SelectList
        setSelected={(val) => setAuthor(val)}
        data={data}
        inputStyles={{ color: "white", fontSize: 20 }}
        dropdownTextStyles={{ color: "white", fontSize: 20 }}
        searchPlaceholder={""}
        searchicon={<Icon name="search" color="white" size={20} style={{ marginRight: 10 }}/>}
        closeicon={<Icon name="chevron-down" color="white" size={20}/>}
        arrowicon={<Icon name="chevron-up" color="white" size={20}/>}
        boxStyles={{ borderRadius: 5, borderColor: "#ccc" }}
        maxHeight={200}
        save="key"
      />
      <Button
        size="lg"
        loading={loadingState}
        buttonStyle={{
          height: 60,
          borderRadius: 10,
          marginVertical: 10,
          width: "100%",
        }}
        onPress={handleCreate}>
        <Text h4 style={{ color: "white", marginHorizontal: 5 }}>
          Goal
        </Text>
      </Button>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15202b",
    gap: 10,
    width: "100%",
    padding: 10,
    height: "100%",
  },
  input: {
    width: "100%",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    color: "#fff",
    fontSize: 20,
    borderRadius: 5,
  },
});
