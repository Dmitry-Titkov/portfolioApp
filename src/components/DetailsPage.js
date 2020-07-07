import React from "react";
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
  Picker,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../src/store/user/selector";
export default function DetailPage({ navigation, route }) {
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
  const auctionId = route.params?.auctionId ?? "2";
  const fetchItem = auctionId - 1;
  const [auctionList, setAuctionList] = useState([]);
  const [bidByUser, setBidByUser] = useState("");
  const [reviewByUser, setReviewByUser] = useState("");
  const [placedBids, setPlacedBids] = useState([]);
  const [placeReview, setPlaceReview] = useState([]);
  const [selectedStars, setSelectedStars] = useState(1);
  const user = useSelector(selectUser);

  async function FetchAuctionList() {
    const response = await axios.get(`http://localhost:4000`);
    setAuctionList(response.data[fetchItem]);
    setPlacedBids(response.data[fetchItem].bids);

    console.log("fetch item", response.data[fetchItem]);
  }

  async function FetchReviews() {
    const responseReviews = await axios.get(`http://localhost:4000/review`);
    setPlaceReview(responseReviews.data[fetchItem].reviews);
    console.log("fetch item", responseReviews.data[fetchItem].reviews);
  }

  useEffect(() => {
    FetchAuctionList();
    FetchReviews();
  }, []);
  function PlaceBid() {
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

  function PlaceReview() {
    var data = {
      chosenAuctionId: auctionList.id,
      comment: reviewByUser,
      rating: selectedStars,
      userId: user.id,
    };

    var header = { headers: { Authorization: `Bearer ${user.token}` } };

    axios.post(
      `http://localhost:4000/auctions/${auctionList.id}/review`,
      data,
      header
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.form}>
            <View style={styles.formLabel}>
              <Text style={styles.labelText}>{auctionList.name}</Text>
            </View>
            <View>
              <Image
                style={{ width: "100%", height: 200, resizeMode: "stretch" }}
                source={{
                  uri: auctionList.image,
                }}
              />

              <Text style={{ textAlign: "center" }}>
                Description {"\n"} {auctionList.description}
              </Text>
              <Text style={{ textAlign: "center" }}>Bids</Text>
              {placedBids.map((bids) => {
                return (
                  <View key={bids.id}>
                    <Text style={{ textAlign: "center" }}>{bids.amount}</Text>
                  </View>
                );
              })}
              <View style={styles.formInputControl}>
                <TextInput
                  style={styles.formInputText}
                  keyboardType="numeric"
                  underlineColorAndroid={"Green"}
                  onChange={(event) => setBidByUser(event.target.value)}
                  value={bidByUser}
                  autoCorrect={false}
                  returnKeyType="next"
                />
              </View>
              <Button title="Place bid" onPress={PlaceBid} />
              {placeReview.map((reviews) => {
                return (
                  <View key={reviews.id}>
                    <Text style={{ textAlign: "center" }}>
                      Rating {reviews.rating}
                      {"\n"}
                      comment
                      {"\n"}
                      {reviews.comment}
                    </Text>
                  </View>
                );
              })}

              <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>Leaxve a rating</Text>
                <Picker
                  selectedValue={selectedStars}
                  style={{ height: 50, width: 150, alignSelf: "center" }}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedStars(itemValue)
                  }
                >
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                  <Picker.Item label="5" value="5" />
                </Picker>
              </View>
              <Text style={{ textAlign: "center" }}>Leave a review</Text>
              <View style={[styles.formRow]}>
                <View style={styles.formInputControl}>
                  <TextInput
                    style={styles.formInputTextArea}
                    multiline={true}
                    underlineColorAndroid={"Green"}
                    onChange={(event) => setReviewByUser(event.target.value)}
                    value={reviewByUser}
                    autoCorrect={false}
                    returnKeyType="next"
                    numberOfLines={8}
                  />
                </View>
              </View>
              <Button title="Leave review" onPress={PlaceReview} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
