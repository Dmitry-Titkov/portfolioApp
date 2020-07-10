import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LoginScreen from "./src/components/Login";
import HomeScreen from "./src/components/homeScreen";
import RegisterScreen from "./src/components/Register";
import DetailsPage from "./src/components/DetailsPage";
import startAuction from "./src/components/SetAuction";
import Profile from "./src/components/Profile";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function Navigatiion() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Sell" component={startAuction} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Action App" component={Navigatiion} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Details" component={DetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
