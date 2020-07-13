import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Text,
  View,
  TextInput,
  Image,
} from "react-native";
import { apiUrl } from "../config/constants";
import { selectToken } from "../store/user/selector";
import { selectUser } from "../store/user/selector";
import { useSelector } from "react-redux";

export default function SetAuction() {
  const [title, setTitle] = useState("");
  const [minBid, setMinBid] = useState("");
  const [descriptor, setDescriptor] = useState("");
  const [end, setEnd] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const user = useSelector(selectUser);
  const userToken = useSelector(selectToken);

  function SubmitForm() {
    var data = {
      name: title,
      minimumBid: minBid,
      date_end: end,
      description: descriptor,
      image: imageUrl,
    };

    var header = { headers: { Authorization: `Bearer ${userToken}` } };

    axios.post(`${apiUrl}/auctions/${user}/create`, data, header);
  }
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  const today = new Date();

  function validationForm() {
    if (
      title === "" ||
      minBid === "" ||
      end === "" ||
      descriptor === "" ||
      imageUrl === ""
    ) {
      window.alert("All fields must be filled in");
    } else {
      if (!end.match(regEx)) {
        window.alert(
          "Please enter the date in the following format YYYY-MM-DD"
        );
      } else {
        if (today.getTime() > new Date(end).getTime()) {
          window.alert("It's impossible to make an auction in the past");
        } else {
          SubmitForm();
        }
      }
    }
  }

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
                  placeholder="Product name..."
                  onChange={(event) => setTitle(event.target.value)}
                  value={title}
                  autoCorrect={false}
                  returnKeyType="next"
                />
              </View>
            </View>
            <View style={[styles.formRow]}>
              <View style={styles.formLabel}>
                <Text style={styles.labelText}></Text>
              </View>
              <View style={styles.formInputControl}>
                <TextInput
                  style={styles.formInputText}
                  placeholder="Minimum price..."
                  keyboardType="numeric"
                  onChange={(event) => setMinBid(event.target.value)}
                  value={minBid}
                  autoCorrect={false}
                  returnKeyType="next"
                />
              </View>
            </View>
            <View style={[styles.formRow]}>
              <View style={styles.formLabel}>
                <Text style={styles.labelText}></Text>
              </View>
              <View style={styles.formInputControl}>
                <TextInput
                  style={styles.formInputText}
                  placeholder="End date..."
                  onChangeText={(text) => setEnd(text)}
                  value={end}
                  autoCorrect={false}
                  returnKeyType="next"
                />
              </View>
            </View>

            <View style={[styles.formRow]}>
              <View style={styles.formLabel}>
                <Text style={styles.labelText}></Text>
              </View>
              <View style={styles.formInputControl}>
                <TextInput
                  style={styles.formInputText}
                  placeholder="Image url..."
                  onChange={(event) => setImageUrl(event.target.value)}
                  value={imageUrl}
                  autoCorrect={false}
                  returnKeyType="next"
                />
              </View>
            </View>
            <View style={styles.formLabel}></View>
            {/* <Image
              style={{ width: "100%", height: 150, resizeMode: "stretch" }}
              source={{
                uri: imageUrl,
              }}
            /> */}
            <View style={[styles.formRow]}>
              <View style={styles.formInputControl}>
                <TextInput
                  style={styles.formInputTextArea}
                  multiline={true}
                  placeholder="Description..."
                  onChange={(event) => setDescriptor(event.target.value)}
                  value={descriptor}
                  autoCorrect={false}
                  returnKeyType="go"
                  onSubmitEditing={(event) => setDescriptor(event.target.value)}
                  numberOfLines={8}
                />
              </View>
            </View>

            <View style={styles.formRowButtons}>
              <TouchableHighlight onPress={() => validationForm()}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Sell item</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
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
