import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RegisterScreen from "./src/components/Register";
import DetailsPage from "./src/components/DetailsPage";

import { selectToken } from "./src/store/user/selector";
import { useSelector } from "react-redux";
import LoggedIn from "./src/components/NavigationLoggedIn";
import LoggedOut from "./src/components/NavigationLoggedOut";

export default function SiteApp() {
  const Stack = createStackNavigator();
  const token = useSelector(selectToken);
  const loginLogoutControls = token ? LoggedIn : LoggedOut;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auction App" component={loginLogoutControls} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Details" component={DetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
