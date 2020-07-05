import React from "react";
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DetailPage({ navigation, route }) {
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
  const auctionId = route.params?.auctionId ?? "2";
  const fetchItem = auctionId - 1;
  const [auctionList, setAuctionList] = useState([]);

  async function FetchAuctionList() {
    const response = await axios.get(`http://localhost:4000`);
    setAuctionList(response.data[fetchItem]);
  }

  useEffect(() => {
    FetchAuctionList();
  }, []);

  return (
    <View>
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text>{auctionList.id}</Text>
        <View>
          <Image
            style={{ width: "100%", height: 200, resizeMode: "stretch" }}
            source={{
              uri: auctionList.image,
            }}
          />

          <Text>
            Description {"\n"} {auctionList.description}
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
      </View>
    </View>
  );
}
