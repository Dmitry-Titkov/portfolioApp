import React from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Search({ navigation }) {
  const [userInput, setUserInput] = useState("");
  const [searchResult, setSearchResult] = useState("");

  async function fetchName(userInput) {
    const response = await axios.get(
      `http://localhost:4000/search/${userInput}`
    );
    console.log("Search", response.data);
    setSearchResult(response.data);
  }
  if (searchResult === "") {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.form}>
              <View style={[styles.formRow]}>
                <View style={styles.formLabel}>
                  <Text style={styles.labelText}></Text>
                </View>
                <View style={styles.formInputControl}>
                  <TextInput
                    style={styles.formInputText}
                    placeholder="Search..."
                    underlineColorAndroid="Green"
                    onChange={(event) => setUserInput(event.target.value)}
                    value={userInput}
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={(_) => fetchName(userInput)}
                  />
                </View>
              </View>
            </View>
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Please fill in the searchbar
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.form}>
              <View style={[styles.formRow]}>
                <View style={styles.formLabel}>
                  <Text style={styles.labelText}></Text>
                </View>
                <View style={styles.formInputControl}>
                  <TextInput
                    style={styles.formInputText}
                    placeholder="Search..."
                    underlineColorAndroid="Green"
                    onChange={(event) => setUserInput(event.target.value)}
                    value={userInput}
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={(_) => fetchName(userInput)}
                  />
                </View>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              {searchResult.map((auction) => {
                return (
                  <View key={auction.id}>
                    <Text style={{ fontSize: 20, textAlign: "center" }}>
                      {auction.name}
                      {"\n"}
                    </Text>
                    <Image
                      style={{
                        width: "100%",
                        height: 200,
                        resizeMode: "stretch",
                      }}
                      source={{
                        uri: auction.image,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: "center",
                        marginTop: 30,
                        marginBottom: 20,
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
          </View>
        </ScrollView>
      </View>
    );
  }
}

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
