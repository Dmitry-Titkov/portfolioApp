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
} from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../../src/store/user/selector";

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
  const user = useSelector(selectUser);

  async function FetchUser() {
    const response = await axios.get(`http://localhost:4000/user/${user.id}`);
    setUserList(response.data);
    setReviewsList(response.data.reviews);
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
          <Text>Your reviews</Text>
          {reviewsList.map((review) => {
            return (
              <View key={review.id}>
                <Text>
                  {"\n"}
                  {review.comment}
                  {"\n"}
                  {review.rating}
                  {"\n"}
                </Text>
              </View>
            );
          })}
        </Text>
        <View style={styles.formRowButtons}>
          <TouchableHighlight
            style={styles.buttonTouch}
            underlayColor="Green"
            onPress={() => {
              AsyncStorage.clear();
              navigation.navigate("Home");
              window.location.reload(false);
            }}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Log out</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
}
