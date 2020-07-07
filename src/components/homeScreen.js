import React from "react";
import { Text, View, Image, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { SearchBar } from "react-native-elements";

export default function StartPage({ navigation, route }) {
  const [auctionList, setAuctionList] = useState([]);

  async function FetchAuctionList() {
    const response = await axios.get(`http://localhost:4000`);
    setAuctionList(response.data);
  }

  useEffect(() => {
    FetchAuctionList();
  }, []);
  auctionList.sort(function (a, b) {
    return b.bids.length - a.bids.length;
  });

  return (
    <View>
      <View style={{ flex: 1 }}>
        {auctionList.map((auction) => {
          return (
            <View key={auction.id}>
              <Image
                style={{ width: "100%", height: 200, resizeMode: "stretch" }}
                source={{
                  uri: auction.image,
                }}
              />
              <Text>{auction.name}</Text>

              <Text>
                Bids{"\n"} {auction.bids.length}
              </Text>
              <Button
                title="Details"
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
});
