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
} from "react-native";

export default function List() {
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

  const [auctionList, setAuctionList] = useState([]);

  async function FetchAuctionList() {
    const response = await axios.get(`http://localhost:4000`);
    setAuctionList(response.data);
  }

  useEffect(() => {
    FetchAuctionList();
  }, []);
  return (
    <View style={([styles.container], { paddingBottom: 53, paddingTop: 53 })}>
      <ScrollView>
        {auctionList.map((auction) => {
          <View key={auction.id}>
            <Image
              style={{ width: 80, height: 80, borderRadius: 50 }}
              source={{ uri: auction.image }}
            />
            <Text
              style={{ fontWeight: "bold", color: "rgba(107, 35, 9, 0.84)" }}
            >
              {auction.id}
            </Text>
          </View>;
        })}
      </ScrollView>
    </View>
  );
}
