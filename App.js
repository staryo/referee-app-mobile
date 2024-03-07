import Authorization from "./src/components/Login/Authorization";
import { useState } from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";
import { Button, Text } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tournaments from "./src/components/Tournaments/Tournaments";

export default function App() {
  const [auth, setAuth] = useState(undefined);
  const [notification, setNotification] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const Stack = createNativeStackNavigator();

  return (
    <>

      {auth
        ?
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Tournaments">
              {(props) => <Tournaments {...props}
                setAuth={setAuth}
                setNotification={setNotification}
                setNotificationOpen={setNotificationOpen}
              />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
        : <Authorization
          setAuth={setAuth}
          setNotificationOpen={setNotificationOpen}
          setNotification={setNotification}
        />
      }
      <Modal
        animationType="none"
        transparent={true}
        visible={notificationOpen}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setNotificationOpen(!notificationOpen);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{notification}</Text>
            <Button
              size="lg"
              onPress={() => setNotificationOpen(!notificationOpen)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Button>
          </View>
        </View>
      </Modal>
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
  title: {
    marginTop: 50,
    color: "white",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
});
