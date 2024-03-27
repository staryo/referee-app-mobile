import { SafeAreaView, StyleSheet, View } from "react-native";
import { useState } from "react";
import { Button, Text } from "@rneui/themed";
import Login from "./Login";
import SignUp from "./SignUp";

export default function Authorization({ setAuth }) {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ paddingVertical: 20, width: "100%", gap: 10, alignItems: "center", backgroundColor: "#343a40" }}>
          <View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>
            <Button
              size="sm"
              buttonStyle={{
                height: 40,
                borderRadius: 10,
                borderColor: "white",
              }}
              type="outline"
              onPress={() => {
                setIsLogin(!isLogin)
              }}>
              <Text style={{ color: "white", marginHorizontal: 5 }}>
                {isLogin ? "SignUp" : "Login"}
              </Text>
            </Button>
            <Text h2 style={styles.title}>
              RefereeAPP
            </Text>
          </View>
        </View>

        {isLogin
          ? <Login
            setAuth={setAuth}
          />
          : <SignUp
            setAuth={setAuth}
          />
        }
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15202b",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
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
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});
