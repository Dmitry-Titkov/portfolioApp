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
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../src/store/user/selector";
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
  const [bidByUser, setBidByUser] = useState([]);
  const [placedBids, setPlacedBids] = useState([]);
  const user = useSelector(selectUser);

  async function FetchAuctionList() {
    const response = await axios.get(`http://localhost:4000`);
    setAuctionList(response.data[fetchItem]);
    setPlacedBids(response.data[fetchItem].bids);
  }
  function SubmitForm() {
    var data = {
      chosenAuctionId: auctionList.id,
      newAmount: bidByUser,
      userId: user.id,
    };

    var header = { headers: { Authorization: `Bearer ${user.token}` } };

    axios.post(
      `http://localhost:4000/auctions/${auctionList.id}/bid`,
      data,
      header
    );
  }
  useEffect(() => {
    FetchAuctionList();
  }, []);

  return (
    <View>
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text>{auctionList.name}</Text>
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
          <Text>Bids</Text>
          {placedBids.map((bids) => {
            return (
              <View key={bids.id}>
                <Text>{bids.amount}</Text>
              </View>
            );
          })}
          <TextInput
            style={styles.formInputText}
            keyboardType="numeric"
            underlineColorAndroid={"Green"}
            onChange={(event) => setBidByUser(event.target.value)}
            value={bidByUser}
            autoCorrect={false}
            returnKeyType="next"
          />
          <Button title="Place Bid" onPress={SubmitForm} />
        </View>
      </View>
    </View>
  );
}
