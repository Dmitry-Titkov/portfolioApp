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
  }

  function LogOut() {
    dispatch(logOut());
  }

  useEffect(() => {
    FetchUser();
  }, []);
  return (
    <View style={[styles.container]}>
      <ScrollView>
        {/* <Text style={{ fontWeight: "bold", color: "rgba(107, 35, 9, 0.84)" }}>
          Name: {userList.display_name}
          <br></br>
          Created at: {userList.createdAt}
          <br></br>
          <Text>Your Auctions {"\n"}</Text>
          <View>
            {auctionList.map((auction) => {
              return (
                <View key={auction.id}>
                  <Button
                    title={auction.name}
                    style={{ paddingBottom: 53, paddingTop: 53 }}
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
          <Text>
            {"\n"} Your Bids per date {"\n"}
          </Text>
          <View>
            {bidlist.map((auction) => {
              return (
                <View key={auction.id}>
                  <Button
                    title={auction.createdAt.substring(0, 10)}
                    style={{ paddingBottom: 53, paddingTop: 53 }}
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
        </Text> */}
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
      </ScrollView>
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
});
