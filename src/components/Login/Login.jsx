import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";
import { Button, Text } from "@rneui/themed";
import { Icon } from "react-native-elements";
import { login } from "../../api/auth";

export default function Login({ setAuth, setNotification, setNotificationOpen }) {
  const [loadingState, setLoadingState] = useState(false);
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

  const handleLogIn = async () => {
    setLoadingState(true);
    try {
      const result = await login(email, password);
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
      <View style={styles.container}>
        <View style={{ paddingBottom: 20, width: "100%", gap: 10, alignItems: "center", backgroundColor: "#343a40" }}>
          <View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>
            <Text h2 style={styles.title}>
              <Icon name="star" type="font-awesome" color="white"/>
            </Text>
            <Text h2 style={styles.title}>
              RefereeAPP
            </Text>
          </View>
        </View>
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
            onChangeText={updatePassword}
            value={password}
            placeholder="Password"
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
            onPress={handleLogIn}>
            <Icon name="login" color="white" style={{ marginHorizontal: 5 }}/>
            <Text h4 style={{ color: "white", marginHorizontal: 5 }}>
              Login
            </Text>
          </Button>
        </View>
        <StatusBar style="light"/>
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
