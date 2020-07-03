import React, { Component } from "react";
import axios from "axios";
import {
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Text,
  View,
  Alert,
  TextInput,
} from "react-native";

class Register extends React.Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    repassword: "",
  };

  SubmitForm() {
    var data = {
      email: this.state.email,
      displayName: this.state.displayName,
      password: this.state.password,
    };

    axios.post(`http://localhost:4000/signup`, data);
  }

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
                    placeholder="Displayname..."
                    underlineColorAndroid="rgba(0, 0, 0, 0)"
                    onChangeText={(event) => {
                      this.setState({ displayName: event });
                    }}
                    value={this.state.displayName}
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
                    placeholder="Email..."
                    underlineColorAndroid="rgba(0, 0, 0, 0)"
                    onChangeText={(event) => {
                      this.setState({ email: event });
                    }}
                    value={this.state.email}
                    autoCorrect={false}
                    keyboardType="email-address"
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
                    placeholder="Password..."
                    underlineColorAndroid="rgba(0, 0, 0, 0)"
                    onChangeText={(event) => {
                      this.setState({ password: event });
                    }}
                    value={this.state.password}
                    autoCorrect={false}
                    secureTextEntry={true}
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
                    placeholder="Confirm password..."
                    underlineColorAndroid="rgba(0, 0, 0, 0)"
                    onChangeText={(event) => {
                      this.setState({ repassword: event });
                    }}
                    value={this.state.repassword}
                    autoCorrect={false}
                    secureTextEntry={true}
                    ref="4"
                  />
                </View>
              </View>

              <View>
                <View style={styles.formRowButtons}>
                  <TouchableHighlight
                    onPress={() => {
                      this.SubmitForm();
                      this.props.navigation.navigate("Login");
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
