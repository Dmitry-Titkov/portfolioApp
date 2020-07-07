import * as React from "react";
import HomeScreen from "./homeScreen";
import SignIn from "./Login";
import Search from "./Search";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

export default function Navigatiion() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Login" component={SignIn} />
    </Tab.Navigator>
  );
}
