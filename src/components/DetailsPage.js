import React from "react";
import { apiUrl } from "../config/constants";
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../src/store/user/selector";
import { selectToken } from "../../src/store/user/selector";

export default function DetailPage({ navigation, route }) {
  const styles = StyleSheet.create({
    body: {
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    underLine: {
      borderBottomColor: "black",
      borderBottomWidth: 1,
    },
    borderLine: {
      borderWidth: 4,
      borderColor: "#20232a",
      borderRadius: 6,
    },
    loginForm: {
      marginTop: 60,
    },
    formRow: {
      flexDirection: "row",
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
    formInputControl: {
      flex: 10,
    },
    formRowButtons: {
      marginLeft: 10,
      marginTop: 10,
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
  const [reviewByUser, setReviewByUser] = useState([]);
  const [placedBids, setPlacedBids] = useState([]);
  const [placeReview, setPlaceReview] = useState([]);
  const [selectedStars, setSelectedStars] = useState(1);
  const [displayName, setDisplayName] = useState("");
  const [userId, setUserId] = useState("");
  const [placedMinimumBid, setplacedMinimumBid] = useState("");
  const user = useSelector(selectUser);
  const userToken = useSelector(selectToken);

  async function FetchAuctionList() {
    const response = await axios.get(`${apiUrl}`);
    setAuctionList(response.data[fetchItem]);
    setPlacedBids(response.data[fetchItem].bids);
    setplacedMinimumBid(response.data[fetchItem].minimum_bid);
  }
  async function FetchUser() {
    const response = await axios.get(`${apiUrl}/user/${auctionId}`);
    setDisplayName(response.data.display_name);
    setUserId(response.data.id);
  }
  useEffect(() => {
    FetchUser();
  }, []);

  async function FetchReviews() {
    const responseReviews = await axios.get(`${apiUrl}/review`);
    setPlaceReview(responseReviews.data[fetchItem].reviews);
  }

  useEffect(() => {
    FetchAuctionList();
    FetchReviews();
  }, []);
  function PlaceBid() {
    if (bidByUser < placedMinimumBid) {
      window.alert("Atleast bid the minimum value");
    } else {
      if (bidByUser > placedBids[placedBids.length - 1].amount) {
        var data = {
          chosenAuctionId: auctionList.id,
          newAmount: bidByUser,
          userId: user,
        };

        var header = { headers: { Authorization: `Bearer ${userToken}` } };

        axios.post(`${apiUrl}/auctions/${auctionList.id}/bid`, data, header);
      } else {
        window.alert("There's no point bidding less then the highest bid");
      }
    }
  }

  function PlaceReview() {
    var data = {
      rating: selectedStars,
      comment: reviewByUser,
      userId: user,
    };

    var header = { headers: { Authorization: `Bearer ${userToken}` } };

    axios.post(`${apiUrl}/auctions/${auctionList.id}/review`, data, header);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.form}>
            <View style={styles.formLabel}>
              <Text
                style={{
                  fontSize: 30,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {auctionList.name}
              </Text>
            </View>
            <View>
              <Image
                style={{ width: "100%", height: 200, resizeMode: "stretch" }}
                source={{
                  uri: auctionList.image,
                }}
              />
              <View style={styles.formRowButtons}>
                <Button
                  title={displayName}
                  onPress={() => {
                    navigation.navigate("UserPage", {
                      userId: userId,
                    });
                  }}
                />
                <View style={styles.borderLine}>
                  <View style={styles.underLine}>
                    <Text style={{ fontSize: 20, textAlign: "center" }}>
                      Description
                    </Text>
                  </View>
                  <Text style={{ textAlign: "center", marginBottom: 20 }}>
                    {auctionList.description}
                  </Text>
                </View>
                <View style={styles.borderLine}>
                  <View style={styles.underLine}>
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: "center",
                      }}
                    >
                      Bids
                      {"\n"}
                    </Text>
                    <Text style={{ textAlign: "center" }}>
                      Minimum bid:{auctionList.minimum_bid}{" "}
                    </Text>
                  </View>
                  {placedBids.map((bids) => {
                    return (
                      <View key={bids.id} style={styles.underLine}>
                        <Text style={{ textAlign: "center" }}>
                          Date placed: {bids.createdAt.substring(0, 10)} {"\n"}
                          Amount: {bids.amount}
                        </Text>
                      </View>
                    );
                  })}

                  <View style={[styles.formRow]}>
                    <View style={styles.formInputControl}>
                      <TextInput
                        style={(styles.formInputText, { padding: 10 })}
                        keyboardType="numeric"
                        placeholder="Place a bid..."
                        onChangeText={(text) => setBidByUser(text)}
                        value={bidByUser}
                        autoCorrect={false}
                        returnKeyType="next"
                      />
                    </View>
                  </View>
                </View>
                <Button
                  title="Place bid"
                  onPress={() => {
                    PlaceBid();
                  }}
                />
                <View style={styles.borderLine}>
                  <View style={styles.underLine}>
                    <Text style={{ fontSize: 20, textAlign: "center" }}>
                      Reviews
                    </Text>
                  </View>
                  {placeReview.map((reviews) => {
                    return (
                      <View key={reviews.id} style={styles.underLine}>
                        <Text style={{ textAlign: "center" }}>
                          Rating: {reviews.rating}
                          {"\n"}
                          {reviews.comment}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <View style={styles.container}>
                  <Text
                    style={{ textAlign: "center", fontSize: 20, marginTop: 10 }}
                  >
                    Leave a review?
                  </Text>

                  <View style={[styles.formRow]}>
                    <View style={styles.formInputControl}>
                      <TextInput
                        style={(styles.formInputText, { padding: 5 })}
                        maxLength={1}
                        placeholder="Leave a rating..."
                        onChange={(event) =>
                          setSelectedStars(event.target.value)
                        }
                        value={selectedStars}
                        autoCorrect={false}
                        returnKeyType="next"
                      />
                    </View>
                  </View>
                </View>

                <View style={[styles.formRow]}>
                  <View style={styles.formInputControl}>
                    <TextInput
                      style={styles.formInputTextArea}
                      multiline={true}
                      placeholder="Review..."
                      onChange={(event) => setReviewByUser(event.target.value)}
                      value={reviewByUser}
                      autoCorrect={false}
                      returnKeyType="next"
                      numberOfLines={8}
                    />
                  </View>
                </View>
                <Button
                  title="Leave review"
                  onPress={() => {
                    PlaceReview();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
