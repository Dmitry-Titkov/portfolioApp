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

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    traffic: 0,
    isConnected: null,
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBar backgroundColor="#f15a24" />
          <View style={styles.body}>
            <View style={styles.loginForm}>
              <View style={[styles.formRow]}>
                <View style={styles.formLabel}>
                  <Text style={styles.labelText}></Text>
                </View>
                <View style={styles.formInputControl}>
                  <TextInput
                    style={styles.formInputText}
                    placeholder="Email..."
                    underlineColorAndroid="rgba(0, 0, 0, 0)"
                    onChangeText={(login) => {
                      this.setState({ username: login });
                    }}
                    value={this.state.username}
                    autoCorrect={false}
                    keyboardType="email-address"
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
                    style={[styles.formInputText]}
                    placeholder="Password..."
                    underlineColorAndroid="rgba(0, 0, 0, 0)"
                    onChangeText={(pass) => {
                      this.setState({ password: pass });
                    }}
                    value={this.state.password}
                    autoCorrect={false}
                    secureTextEntry={true}
                    ref="2"
                  />
                </View>
              </View>
              {this.state.responseMsg ? (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: 20,
                  }}
                >
                  <Text style={{ color: this.state.statusColor }}>
                    {this.state.responseMsg}
                  </Text>
                </View>
              ) : null}
              {this.state.traffic == 0 ? (
                <View>
                  <View style={styles.formRowButtons}>
                    <TouchableHighlight
                      onPress={() => {
                        this.login();
                      }}
                    >
                      <View style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                  <View style={styles.formRowButtons}>
                    <TouchableHighlight
                      style={styles.buttonTouch}
                      onPress={() => {
                        Actions.register();
                      }}
                    >
                      <View style={styles.button}>
                        <Text style={styles.buttonText}>
                          Don't have an account yet?
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

export default Login;
