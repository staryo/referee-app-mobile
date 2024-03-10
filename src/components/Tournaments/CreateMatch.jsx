import { Alert, StyleSheet, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { Button, Text } from "@rneui/themed";
import { createMatch } from "../../api/matches";
import { SelectList } from "react-native-dropdown-select-list"
import Icon from "react-native-vector-icons/FontAwesome";

export default function CreateMatch({ navigation, route }) {

  const { tournamentId, title, teamsList } = route.params

  const [loadingState, setLoadingState] = useState(false);
  const [name, setName] = useState("")
  const [firstTeam, setFirstTeam] = useState(undefined)
  const [secondTeam, setSecondTeam] = useState(undefined)

  const handleCreate = async () => {
    setLoadingState(true);
    try {
      await createMatch({ name, team1Id: firstTeam, team2Id: secondTeam, tournamentId });
      navigation.navigate(
        "Tournament",
        { title, tournamentId, check: Math.floor(Math.random() * 100) },
      )
    } catch (error) {
      Alert.alert(`Error ${error}`);
    }
    setLoadingState(null);
  };
  const data = teamsList.map((row) => {
    return {
      key: row.id,
      value: row.team_name,
    }
  })

  useEffect(() => {
    const firstTeamName = teamsList.filter((row) => row.id === firstTeam)?.[0]?.team_name
    const secondTeamName = teamsList.filter((row) => row.id === secondTeam)?.[0]?.team_name
    if (firstTeamName && secondTeamName) setName(`${firstTeamName} vs ${secondTeamName}`)
  }, [firstTeam, secondTeam]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Match name"
        placeholderTextColor="#aaa"
      />
      <SelectList
        setSelected={(val) => setFirstTeam(val)}
        data={data}
        inputStyles={{ color: "white", fontSize: 20 }}
        dropdownTextStyles={{ color: "white", fontSize: 20 }}
        searchPlaceholder={""}
        searchicon={<Icon name="search" color="white" size={20} style={{marginRight: 10}}/>}
        closeicon={<Icon name="chevron-down" color="white" size={20}/>}
        arrowicon={<Icon name="chevron-up" color="white" size={20}/>}
        boxStyles={{ borderRadius: 5, borderColor: "#ccc" }}
        maxHeight={100}
        save="key"
      />
      <SelectList
        setSelected={(val) => setSecondTeam(val)}
        data={data}
        inputStyles={{ color: "white", fontSize: 20 }}
        dropdownTextStyles={{ color: "white", fontSize: 20 }}
        searchPlaceholder={""}
        searchicon={<Icon name="search" color="white" size={20} style={{marginRight: 10}}/>}
        closeicon={<Icon name="chevron-down" color="white" size={20}/>}
        arrowicon={<Icon name="chevron-up" color="white" size={20}/>}
        boxStyles={{ borderRadius: 5, borderColor: "#ccc" }}
        maxHeight={100}
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
        <Icon name="plus-square"
              color="white" size={20} style={{ marginHorizontal: 5 }}/>
        <Text h4 style={{ color: "white", marginHorizontal: 5 }}>
          Add
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
