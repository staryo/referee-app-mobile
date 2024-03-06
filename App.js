import Login from "./src/components/Login/Login";
import { useState } from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";
import { Button, Text } from "@rneui/themed";
import { logout } from "./src/api/auth";
import { Icon } from "react-native-elements";

export default function App() {
  const [auth, setAuth] = useState(undefined);
  const [notification, setNotification] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  console.log(auth)
  const handleLogOut = async () => {
    try {
      await logout();
      setAuth(null);
      setNotification(`Bye`)
    } catch (error) {
      setNotification("Logout error!");
    }
    setNotificationOpen(true)
  };

  return (
    <>
      {auth
        ?
        <View style={styles.container}>
          <Text h2 style={styles.title}>
            RefereeAPP
          </Text>
          <Button
            size="lg"
            buttonStyle={{
              height: 60,
              borderRadius: 10,
              marginVertical: 10,
            }}
            onPress={handleLogOut}>
            <Icon name="logout" color="white" style={{ marginHorizontal: 5 }}/>
            <Text h4 style={{ color: "white", marginHorizontal: 5 }}>
              Logout
            </Text>
          </Button>

        </View>
        : <Login
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
