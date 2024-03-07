import { StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";
import { Button, Text } from "@rneui/themed";
import { Icon } from "react-native-elements";
import { login, signUp } from "../../api/auth";

export default function SignUp({ setAuth, setNotification, setNotificationOpen }) {
  const [loadingState, setLoadingState] = useState(false);
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");
  const [repeatPassword, updateRepeatPassword] = useState("");
  const [firstName, updateFirstName] = useState("");
  const [lastName, updateLastName] = useState("");

  const handleSignUp = async () => {
    setLoadingState(true);
    try {
      await signUp({ email, firstName, lastName, password, repeatPassword });
      const result = await login(email, password)
      setAuth(result);
      setNotification(`Hello, ${result?.first_name} ${result?.last_name}`)
    } catch (error) {
      setNotification("Authorization error! Wrong login or password.");
    }
    setNotificationOpen(true)
    setLoadingState(null);
  };

  return (
    <>
      <View style={{ width: "90%", gap: 10, justifyContent: "center", marginVertical: 50, flex: 1 }}>
        <TextInput
          style={styles.input}
          onChangeText={updateEmail}
          value={email}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          onChangeText={updateFirstName}
          value={firstName}
          placeholder="First name"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          onChangeText={updateLastName}
          value={lastName}
          placeholder="Last name"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          onChangeText={updatePassword}
          value={password}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          onChangeText={updateRepeatPassword}
          value={repeatPassword}
          placeholder="Repeat password"
          placeholderTextColor="#aaa"
          secureTextEntry={true}
        />
        <Button
          size="lg"
          loading={loadingState}
          buttonStyle={{
            height: 60,
            borderRadius: 10,
            marginVertical: 10,
          }}
          onPress={handleSignUp}>
          <Icon name="address-book"   type='font-awesome'
                color="white" style={{ marginHorizontal: 5 }}/>
          <Text h4 style={{ color: "white", marginHorizontal: 5 }}>
            SignUp
          </Text>
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15202b",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
    width: "100%",
    alignSelf: "center",
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
  title: {
    marginTop: 50,
    color: "white",
    fontWeight: "bold",
  },
});
