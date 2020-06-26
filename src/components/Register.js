import React, { Component } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Text,
  View,
  StatusBar,
  TextInput,
} from "react-native";

class Register extends React.Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    repassword: "",
    traffic: 0,
    responseMsg: "",
    isConnected: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.registerForm}>
              <View style={[styles.formRow]}>
                <View style={styles.formLabel}>
                  <Text style={styles.labelText}></Text>
                </View>
                <View style={styles.formInputControl}>
                  <TextInput
                    style={styles.formInputText}
                    placeholder="Firstname..."
                    underlineColorAndroid="rgba(0, 0, 0, 0)"
                    onChangeText={(fname) => {
                      this.setState({ firstname: fname });
                    }}
                    value={this.state.firstname}
                    autoCorrect={false}
                    returnKeyType="next"
                    ref="1"
                    onSubmitEditing={() => this.focusNextField("2")}
                  />
                </View>
              </View>
              <View style={[styles.formRow]}>
                <View style={styles.formLabel}>
                  <Text style={styles.labelText}></Text>
                </View>
                <View style={styles.formInputControl}>
                  <TextInput
                    style={[styles.formInputText]}
                    placeholder="Lastname..."
                    underlineColorAndroid="rgba(0, 0, 0, 0)"
                    onChangeText={(lname) => {
                      this.setState({ lastname: lname });
                    }}
                    value={this.state.lastname}
                    autoCorrect={false}
                    returnKeyType="next"
                    ref="2"
                    onSubmitEditing={() => this.focusNextField("3")}
                  />
                </View>
              </View>

              <View style={[styles.formRow]}>
                <View style={styles.formLabel}>
                  <Text style={styles.labelText}></Text>
                </View>
                <View style={styles.formInputControl}>
                  <TextInput
                    style={[styles.formInputText]}
                    placeholder="Email..."
                    underlineColorAndroid="rgba(0, 0, 0, 0)"
                    onChangeText={(email) => {
                      this.setState({ email: email });
                    }}
                    value={this.state.email}
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                    ref="3"
                    onSubmitEditing={() => this.focusNextField("4")}
                  />
                </View>
              </View>
              <View style={[styles.formRow]}>
                <View style={styles.formLabel}>
                  <Text style={styles.labelText}></Text>
                </View>
                <View style={styles.formInputControl}>
                  <TextInput
                    style={[styles.formInputText]}
                    placeholder="Phone number..."
                    underlineColorAndroid="rgba(0, 0, 0, 0)"
                    onChangeText={(phone) => {
                      this.setState({ phone: phone });
                    }}
                    value={this.state.phone}
                    autoCorrect={false}
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    ref="4"
                    onSubmitEditing={() => this.focusNextField("5")}
                  />
                </View>
              </View>
              <View style={[styles.formRow]}>
                <View style={styles.formLabel}>
                  <Text style={styles.labelText}></Text>
                </View>
                <View style={styles.formInputControl}>
                  <TextInput
                    style={[styles.formInputText]}
                    placeholder="Password..."
                    underlineColorAndroid="rgba(0, 0, 0, 0)"
                    onChangeText={(pass) => {
                      this.setState({ password: pass });
                    }}
                    value={this.state.password}
                    autoCorrect={false}
                    secureTextEntry={true}
                    returnKeyType="next"
                    ref="5"
                    onSubmitEditing={() => this.focusNextField("6")}
                  />
                </View>
              </View>
              <View style={[styles.formRow]}>
                <View style={styles.formLabel}>
                  <Text style={styles.labelText}></Text>
                </View>
                <View style={styles.formInputControl}>
                  <TextInput
                    style={[styles.formInputText]}
                    placeholder="Confirm password..."
                    underlineColorAndroid="rgba(0, 0, 0, 0)"
                    onChangeText={(repass) => {
                      this.setState({ repassword: repass });
                    }}
                    value={this.state.repassword}
                    autoCorrect={false}
                    secureTextEntry={true}
                    ref="6"
                  />
                </View>
              </View>
              {this.state.responseMsg != "" ? (
                <View style={styles.status}>
                  <Text
                    style={[
                      {
                        flex: 1,
                        textAlign: "center",
                        color: this.state.statusColor,
                      },
                    ]}
                  >
                    &nbsp;&nbsp;&nbsp;
                    {this.state.responseMsg}
                  </Text>
                </View>
              ) : null}
              {this.state.traffic == 0 ? (
                <View>
                  <View style={styles.formRowButtons}>
                    <TouchableHighlight
                      onPress={() => {
                        this.register();
                      }}
                    >
                      <View style={styles.button}>
                        <Text style={styles.buttonText}>Register</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                  <View style={styles.formRowButtons}>
                    <TouchableHighlight
                      style={styles.buttonTouch}
                      onPress={() => this.props.navigation.navigate("Login")}
                    >
                      <View style={styles.button}>
                        <Text style={styles.buttonText}>
                          Have an account? Login
                        </Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>
              ) : null}
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
  registerForm: {
    marginBottom: 30,
  },
  status: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
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
    color: "cadetblue",
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
    color: "#ffffff",
  },
  buttonTouch: {
    borderRadius: 4,
  },
});

export default Register;
