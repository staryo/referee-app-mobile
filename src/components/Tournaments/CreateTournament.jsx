import { Alert, StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";
import { createTournament } from "../../api/tournaments";
import { Button, Text } from "@rneui/themed";
import { Icon } from "react-native-elements";


export default function CreateTournament({ navigation }) {
  const [loadingState, setLoadingState] = useState(false);
  const [tournamentName, setTournamentName] = useState("")
  const [sportsName, setSportsName] = useState("")
  const [defaultNumberOfPeriods, setDefaultNumberOfPeriods] = useState(undefined)
  const [defaultPeriodDuration, setDefaultPeriodDuration] = useState(undefined)

  const handleCreate = async () => {
    setLoadingState(true);
    try {
      await createTournament({ tournamentName, sportsName, defaultNumberOfPeriods, defaultPeriodDuration });
      navigation.navigate("Tournaments", { check: Math.floor(Math.random() * 100) })
    } catch (error) {
      Alert.alert(`Error ${error}`);
    }
    setLoadingState(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setTournamentName}
        value={tournamentName}
        placeholder="Name"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        onChangeText={setSportsName}
        value={sportsName}
        placeholder="Sport"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        onChangeText={setDefaultNumberOfPeriods}
        value={defaultNumberOfPeriods}
        placeholder="Number of periods"
        placeholderTextColor="#aaa"
        keyboardType="number-pad"
      />
      <TextInput
        style={styles.input}
        onChangeText={setDefaultPeriodDuration}
        value={defaultPeriodDuration}
        placeholder="Duration of period"
        placeholderTextColor="#aaa"
        keyboardType="number-pad"
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
        <Icon name="save" type="font-awesome"
              color="white" style={{ marginHorizontal: 5 }}/>
        <Text h4 style={{ color: "white", marginHorizontal: 5 }}>
          Save
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
