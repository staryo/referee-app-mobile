import Authorization from "./src/components/Login/Authorization";
import { useState } from "react";
import { Button } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tournaments from "./src/components/Tournaments/Tournaments";
import { Icon } from "react-native-elements";
import { logout } from "./src/api/auth";
import CreateTournament from "./src/components/Tournaments/CreateTournament";
import OneTournament from "./src/components/Tournaments/OneTournament";
import CreatePlayer from "./src/components/Tournaments/CreatePlayer";
import CreateTeam from "./src/components/Tournaments/CreateTeam";

export default function App() {
  const [auth, setAuth] = useState(undefined);
  const Stack = createNativeStackNavigator();

  const handleLogOut = async () => {
    try {
      await logout();
      setAuth(null);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>

      {auth
        ?
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#343a40",
            },
            animation: "fade_from_bottom",
            headerRight: () => (
              <Button
                size="sm"
                buttonStyle={{
                  borderRadius: 10,
                  padding: 5,
                  gap: 10,
                }}
                type="clear"
                onPress={handleLogOut}>
                <Icon name="logout" color="white"/>
              </Button>
            ),
          }}>
            <Stack.Screen
              name="Tournaments"
              component={Tournaments}
              initialParams={{ check: 0 }}
            />
            <Stack.Screen
              name="New Tournament"
              component={CreateTournament}
            />
            <Stack.Screen
              name="Tournament"
              component={OneTournament}
              options={({ route }) => ({ title: route.params.title })}
            />
            <Stack.Screen
              name="New Player"
              component={CreatePlayer}
              options={({ route }) => ({ title: route.params.title })}
            />
            <Stack.Screen
              name="New Team"
              component={CreateTeam}
              options={({ route }) => ({ title: route.params.title })}
            />
          </Stack.Navigator>
        </NavigationContainer>
        : <Authorization setAuth={setAuth}/>
      }
    </>
  );
}