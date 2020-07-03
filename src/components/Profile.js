import React, { Component } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Text,
  View,
  StatusBar,
  TextInput,
  FlatList,
  Image,
  AsyncStorage,
  NetInfo,
} from "react-native";

export default function Profile({ navigation }) {
  const styles = StyleSheet.create({
    container: {
      marginTop: 53,
      backgroundColor: "#fff",
      flex: 1,
    },
    body: {
      flex: 1,
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
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    labelText: {
      color: "#f15a24",
    },
    formInputControl: {
      flex: 10,
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

  const [userList, setUserList] = useState([]);
  const [reviewsList, setReviewsList] = useState([]);

  async function FetchUser() {
    const response = await axios.get(`http://localhost:4000/user/1`);
    setUserList(response.data);
    setReviewsList(
      response.data.reviews.map((review) => {
        {
          review.comment, review.stars;
        }
      })
    );
    console.log(response.data.reviews[0]["comment"]);
  }

  useEffect(() => {
    FetchUser();
  }, []);
  return (
    <View style={([styles.container], { paddingBottom: 53, paddingTop: 53 })}>
      <ScrollView>
        <Text style={{ fontWeight: "bold", color: "rgba(107, 35, 9, 0.84)" }}>
          Name: {userList.display_name}
          <br></br>
          {userList.createdAt}
          <br></br>
          {console.log(reviewsList)}
        </Text>
      </ScrollView>
    </View>
  );
}
