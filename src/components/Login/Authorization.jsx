import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Button, Text } from "@rneui/themed";
import { Icon } from "react-native-elements";
import Login from "./Login";
import SignUp from "./SignUp";

export default function Authorization({ setAuth, setNotification, setNotificationOpen }) {
  const [isLogin, setIsLogin] = useState(true)

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
        {isLogin
          ? <Login
            setAuth={setAuth}
            setNotificationOpen={setNotificationOpen}
            setNotification={setNotification}
          />
          : <SignUp
            setAuth={setAuth}
            setNotificationOpen={setNotificationOpen}
            setNotification={setNotification}
          />
        }
        <View style={{ width: "90%", justifyContent: "center" }}>
          <Button
            size="lg"
            buttonStyle={{
              height: 60,
              borderRadius: 10,
              marginVertical: 10,
            }}
            onPress={() => {
              setIsLogin(!isLogin)
            }}>
            <Text h4 style={{ color: "white", marginHorizontal: 5 }}>
              {isLogin ? "SignUp" : "Login"}
            </Text>
          </Button>
        </View>
        {/*<StatusBar style="light"/>*/}
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
