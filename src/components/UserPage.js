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
  Image,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "../../src/store/user/selector";
import { apiUrl } from "../config/constants";
import { useFocusEffect } from "@react-navigation/native";

export default function UserPage({ navigation, route }) {
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

  const userId = route.params?.userId ?? "2";
  const [displayName, setDisplayName] = useState("");
  const [auctions, setAuctions] = useState([]);

  async function FetchUser() {
    const response = await axios.get(`${apiUrl}/user/${userId}`);
    setDisplayName(response.data.display_name);
    setAuctions(response.data.auctions);
    console.log(response.data.auctions);
  }

  useFocusEffect(
    React.useCallback(() => {
      FetchUser();
    }, [])
  );

  return (
    <View style={styles.viewfix}>
      <View>
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {displayName}
        </Text>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
          }}
        >
          {"\n"}
          Auctions of the user:
          {"\n"}
        </Text>
      </View>

      <ScrollView>
        <View style={styles.viewfix}>
          {auctions.map((auction) => {
            return (
              <View key={auction.id}>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {auction.name}
                </Text>

                <Button
                  title="Details"
                  style={{ marginTop: 30, marginBot: 30 }}
                  onPress={() =>
                    navigation.navigate("Details", {
                      auctionId: auction.id,
                    })
                  }
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
