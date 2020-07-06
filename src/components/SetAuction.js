import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  Button,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { selectUser } from "../store/user/selector";
import { useDispatch, useSelector } from "react-redux";

export default function SetAuction() {
  const [title, setTitle] = useState("");
  const [minimumBid, setMinimumBid] = useState("");
  const [descriptor, setDescriptor] = useState("");
  const [end, setEnd] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const user = useSelector(selectUser);

  function SubmitForm() {
    var data = {
      name: title,
      minimumBid: minimumBid,
      date_end: end,
      description: descriptor,
      image: imageUrl,
    };

    var header = { headers: { Authorization: `Bearer ${user.token}` } };

    axios.post(`http://localhost:4000/auctions/1/create`, data, header);
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
                  underlineColorAndroid="Green"
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
                  underlineColorAndroid={"Green"}
                  onChange={(event) => setMinimumBid(event.target.value)}
                  value={minimumBid}
                  autoCorrect={false}
                  returnKeyType="next"
                />
              </View>
            </View>
            <View style={[styles.formRow]}>
              <View style={styles.formLabel}>
                <Text style={styles.labelText}></Text>
              </View>
              <TextInput
                style={styles.formInputText}
                placeholder="End date..."
                underlineColorAndroid={"Green"}
                onChange={(event) => setEnd(event.target.value)}
                value={end}
                autoCorrect={false}
                returnKeyType="next"
              />
              {/* <DatePicker
                style={{ width: 200 }}
                date="01-08-2020"
                mode="date"
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate="01-08-2020"
                maxDate="31-12-2020"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                }}
                onChange={(event) => setEnd(event.target.value)}
              /> */}
            </View>
            <View style={[styles.formRow]}>
              <View style={styles.formLabel}>
                <Text style={styles.labelText}></Text>
              </View>
              <View style={styles.formInputControl}>
                <TextInput
                  style={styles.formInputText}
                  placeholder="Image url..."
                  underlineColorAndroid={"Green"}
                  onChange={(event) => setImageUrl(event.target.value)}
                  value={imageUrl}
                  autoCorrect={false}
                  returnKeyType="next"
                />
              </View>
            </View>
            {/* <TouchableHighlight
                style={[styles.formButton]}
                underlayColor="Green"
              >
                <View>
                  <View style={styles.formRowButtons}>
                    <TouchableHighlight
                      style={styles.buttonTouch}
                      onPress={(event) => {
                        this.setState({ imageUrl: event });
                      }}
                      underlayColor="blue"
                    >
                      <View style={styles.button}>
                        <Text style={styles.buttonText}>add a photo</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              </TouchableHighlight> */}
            <View style={[styles.formRow]}>
              <View style={styles.formLabelDescription}>
                <Text style={styles.labelText}></Text>
              </View>
              <View style={styles.formInputControl}>
                <TextInput
                  style={styles.formInputTextArea}
                  multiline={true}
                  placeholder="Description..."
                  underlineColorAndroid="Green"
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
              <TouchableHighlight
                style={styles.buttonTouch}
                onPress={SubmitForm}
                underlayColor="Green"
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Sell product</Text>
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
