import React from "react";
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

class SetAuction extends React.Component {
  state = {
    title: "",
    minimumBid: "",
    descriptor: "",
    end: new Date(),
    imageUrl: "",
  };
  SubmitForm() {
    var data = [
      {
        name: "name",
        data: this.state.title,
        name: "minimumBid",
        data: this.state.minimumBid,
        name: "end_date",
        data: this.state.end,
        name: "description",
        data: this.state.descriptor,
        name: "image",
        data: this.state.imageUrl,
      },
    ];
    axios.post(`http://localhost:4000/auctions/1/create`, data);
  }

  render() {
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
                    onChangeText={(event) => {
                      this.setState({ title: event });
                    }}
                    value={this.state.title}
                    autoCorrect={false}
                    returnKeyType="next"
                    ref="1"
                    onSubmitEditing={() => {
                      this.focusNextField("2");
                    }}
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
                    placeholder="Minimal price..."
                    keyboardType="numeric"
                    underlineColorAndroid={"Green"}
                    onChangeText={(event) => {
                      this.setState({ minimumBid: event });
                    }}
                    value={this.state.minimumBid}
                    autoCorrect={false}
                    returnKeyType="next"
                    ref="2"
                  />
                </View>
              </View>
              <View style={[styles.formRow]}>
                <View style={styles.formLabel}>
                  <Text style={styles.labelText}></Text>
                </View>
                <DatePicker
                  style={{ width: 200 }}
                  date={Date.now()}
                  mode="date"
                  placeholder="select date"
                  format="DD-MM-YYYY"
                  minDate="01-01-2016"
                  maxDate="01-01-2019"
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
                  onDateChange={(event) => {
                    this.setState({ end: event });
                  }}
                />
              </View>
              <TouchableHighlight
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
              </TouchableHighlight>
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
                    onChangeText={(event) => {
                      this.setState({ descriptor: event });
                    }}
                    value={this.state.descriptor}
                    autoCorrect={false}
                    returnKeyType="go"
                    onSubmitEditing={(event) => {
                      this.setState({ descriptor: event });
                    }}
                    numberOfLines={8}
                  />
                </View>
              </View>

              <View style={styles.formRowButtons}>
                <TouchableHighlight
                  style={styles.buttonTouch}
                  onPress={() => {
                    this.SubmitForm();
                  }}
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

export default SetAuction;
