import { StyleSheet, View } from "react-native";
import { Button, Text } from "@rneui/themed";
import { Icon } from "react-native-elements";
import { logout } from "../../api/auth";

export default function Tournaments({ navigation, setAuth, setNotification, setNotificationOpen }) {
  const handleLogOut = async () => {
    try {
      await logout();
      setAuth(null);
      setNotification(`Bye`)
    } catch (error) {
      console.log(error)
      setNotification("Logout error!");
    }
    setNotificationOpen(true)
  };

  return (
    <View style={styles.container}>
      <View style={{
        alignSelf: "flex-end"
      }}>
        <Button
          size="sm"
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
    </View>
  )
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
    marginTop: 5,
    color: "white",
    fontWeight: "bold",
  },
});
