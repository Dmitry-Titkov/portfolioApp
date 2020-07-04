import * as React from "react";
import HomeScreen from "./homeScreen";
import startAuction from "./SetAuction";
import Profile from "./Profile";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

export default function Navigatiion() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Sell" component={startAuction} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
