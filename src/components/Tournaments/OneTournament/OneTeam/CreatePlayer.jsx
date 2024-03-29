import { Alert, StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";
import { Button, Text } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome";
import { createPlayer } from "../../../../api/players";


export default function CreatePlayer({ navigation, route }) {

  const { teamId, title } = route.params

  const [loadingState, setLoadingState] = useState(false);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [description, setDescription] = useState("")

  const handleCreate = async () => {
    setLoadingState(true);
    try {
      await createPlayer({ firstName, lastName, description, teamId });
      navigation.navigate(
        "Team",
        { title, teamId, check: Math.floor(Math.random() * 100) },
      )
    } catch (error) {
      Alert.alert(`Error ${error}`);
    }
    setLoadingState(null);
  };

  return (
    <View style={styles.container}>
      <Text h1 style={{ color: "white" }}> New Player </Text>
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First name"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Last name"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Description"
        placeholderTextColor="#aaa"
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
