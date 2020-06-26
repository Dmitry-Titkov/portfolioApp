import React from "react";
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
    productName: "",
    price: "",
    description: "",
    endDate: new Date(),
    auctionEndDate: null,
    endDateText: "Select auction end date ...",
    endTimeHour: null,
    endTimeMinute: null,
    endTimeText: "Select auction end time ...",
    auctionEndTime: null,
    pictureSource: null,
    picture: null,
    traffic: 0,
    statusColor: "green",
    successStatus: "",
    isConnected: null,
  };
  constructor(props) {
    super(props);
    //set value in state for initial date
    this.state = { date: new Date() };
  }

  render() {
    let img =
      this.state.pictureSource == null ? null : (
        <Lightbox
          underlayColor="white"
          backgroundColor="Green"
          navigator={this.props.navigator}
        >
          <View style={styles.center}>
            <Image source={this.state.pictureSource} style={styles.image} />
          </View>
        </Lightbox>
      );
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
                    onChangeText={(product) => {
                      this.setState({ productName: product });
                    }}
                    value={this.state.productName}
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
                    onChangeText={(price) => {
                      this.setState({ price: price });
                    }}
                    value={this.state.price}
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
                  date={this.state.date}
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
                  onDateChange={(date) => {
                    this.setState({ date: date });
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
                      onPress={() => {
                        this.sendData();
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
              <View style={styles.imgHolder}>{img}</View>
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
                    onChangeText={(description) => {
                      this.setState({ description: description });
                    }}
                    value={this.state.description}
                    autoCorrect={false}
                    returnKeyType="go"
                    onSubmitEditing={() => {
                      this.sendData();
                    }}
                    numberOfLines={8}
                  />
                </View>
              </View>
              {this.state.responseMsg ? (
                <View style={styles.statusText}>
                  <Text style={{ color: this.state.statusColor }}>
                    {this.state.responseMsg}
                  </Text>
                </View>
              ) : null}
              {this.state.successStatus ? (
                <View style={styles.statusText}>
                  <Text style={styles.success}>{this.state.successStatus}</Text>
                </View>
              ) : null}
              <View style={styles.formRowButtons}>
                <TouchableHighlight
                  style={styles.buttonTouch}
                  onPress={() => {
                    this.sendData();
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
  show() {
    pick((source, data) => {
      this.setState({ pictureSource: source, picture: data });
    });
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
