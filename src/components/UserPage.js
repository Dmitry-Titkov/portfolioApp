import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Text,
  View,
  AsyncStorage,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../../src/store/user/selector";
import { apiUrl } from "../config/constants";

export default function UserPage({ navigation, route }) {
  const userId = route.params?.userId ?? "2";
  const [displayName, setDisplayName] = useState("");

  async function FetchUser() {
    const response = await axios.get(`${apiUrl}/user/${userId}`);
    setDisplayName(response.data.display_name);
    console.log(response.data);
  }

  useEffect(() => {
    FetchUser();
  }, []);
  return <View></View>;

  const styles = StyleSheet.create({
    container: {
      marginTop: 53,
      backgroundColor: "#fff",
    },
    body: {
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    loginForm: {
      marginTop: 60,
    },
    formRow: {
      flexDirection: "row",
      marginLeft: 30,
      marginTop: 30,
      marginRight: 30,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: "cadetblue",
      padding: 1,
      borderRadius: 4,
    },
    formLabel: {
      backgroundColor: "#fff",

      alignItems: "center",
      justifyContent: "center",
    },
    labelText: {
      color: "#f15a24",
    },

    formRowButtons: {
      marginLeft: 30,
      marginTop: 30,
      marginRight: 30,
      padding: 1,
      borderRadius: 4,
      justifyContent: "center",
    },
    button: {
      backgroundColor: "cadetblue",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 35,
      paddingRight: 35,
      borderRadius: 4,
    },
    buttonText: {
      color: "black",
    },
    buttonTouch: {
      borderRadius: 4,
    },
    status: {
      justifyContent: "center",
      alignItems: "center",
    },
  });
}
