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
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import { logOut } from "../store/user/actions";
import { useDispatch } from "react-redux";
import { selectUser } from "../../src/store/user/selector";
import { apiUrl } from "../config/constants";
import { useFocusEffect } from "@react-navigation/native";

export default function Profile({ navigation }) {
  const [userList, setUserList] = useState([]);
  const [auctionList, setAuctionList] = useState([]);
  const [bidlist, setBidlist] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  async function FetchUser() {
    const response = await axios.get(`${apiUrl}/user/${user}`);
    setUserList(response.data);
    setBidlist(response.data.bids);
    setAuctionList(response.data.auctions);
    console.log("response.data.auctions", response.data.auctions[0].name);
  }

  function LogOut() {
    dispatch(logOut());
  }

  useFocusEffect(
    React.useCallback(() => {
      FetchUser();
    }, [])
  );
  return (
    <View>
      <Text style={{ fontWeight: "bold", color: "rgba(107, 35, 9, 0.84)" }}>
        Name: {userList.display_name}
        {"\n"}
        Created at: {userList.createdAt}
        {"\n"}
        <Text>Your Auctions {"\n"}</Text>
        <ScrollView>
          <View style={styles.viewfix}>
            {auctionList.map((auction) => {
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
        {/* <View>
          {auctionList.map((auction) => {
            return (
              <View key={auction.id}>
                <Button
                  title={auction.name}
                  style={{ marginTop: 30, marginBot: 30, padding: 20 }}
                  onPress={() =>
                    navigation.navigate("Details", {
                      auctionId: auction.id,
                    })
                  }
                />
                <Text>{"\n"}</Text>
              </View>
            );
          })}
        </View> */}
        <Text>
          {"\n"} Your Bids per date {"\n"}
        </Text>
        <View>
          {bidlist.map((auction) => {
            return (
              <View key={auction.id}>
                <Button
                  title={auction.createdAt.substring(0, 10)}
                  style={{ marginTop: 30, marginBot: 30 }}
                  onPress={() =>
                    navigation.navigate("Details", {
                      auctionId: auction.id,
                    })
                  }
                />
                <Text>{"\n"}</Text>
              </View>
            );
          })}
        </View>
      </Text>
      <View style={styles.formRowButtons}>
        <TouchableHighlight
          style={styles.buttonTouch}
          onPress={() => {
            LogOut();
            // navigation.navigate("Home");
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Log out</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}
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
  viewfix: {
    width: null,
    height: null,
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
