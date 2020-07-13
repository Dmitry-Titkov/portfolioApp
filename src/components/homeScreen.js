import React from "react";
import { Text, View, Image, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { apiUrl } from "../config/constants";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

export default function StartPage({ navigation, route }) {
  const [auctionList, setAuctionList] = useState([]);

  async function FetchAuctionList() {
    const response = await axios.get(`${apiUrl}`);
    setAuctionList(response.data);
  }

  useEffect(() => {
    FetchAuctionList();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      FetchAuctionList();
    }, [])
  );

  auctionList.sort(function (a, b) {
    return b.bids.length - a.bids.length;
  });

  return (
    <View style={styles.viewfix}>
      <ScrollView>
        <View style={styles.viewfix}>
          {auctionList.map((auction) => {
            return (
              <View key={auction.id}>
                <Image
                  style={{ width: "100%", height: 200, resizeMode: "stretch" }}
                  source={{
                    uri: auction.image,
                  }}
                />
                <Text
                  style={{
                    fontSize: 30,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {auction.name}
                  {"\n"}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    marginTop: 20,
                    marginBottom: 10,
                  }}
                >
                  Bids placed: {auction.bids.length}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    marginTop: 10,
                    marginBottom: 20,
                  }}
                >
                  Auction end: {auction.date_end.substring(0, 10)}
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

const styles = StyleSheet.create({
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
  viewfix: {
    width: null,
    height: null,
  },
});
