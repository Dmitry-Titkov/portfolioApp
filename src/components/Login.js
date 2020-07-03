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
    email: "",
    password: "",
  };

  SubmitForm() {
    var data = [
      {
        name: "email",
        data: this.state.email,
        name: "password",
        data: this.state.password,
      },
    ];
    axios.post(`http://localhost:4000/login`, data);
  }

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
                    onChangeText={(event) => {
                      this.setState({ email: event });
                    }}
                    value={email}
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
                    onChangeText={(event) => {
                      this.setState({ password: event });
                    }}
                    value={this.state.password}
                    autoCorrect={false}
                    secureTextEntry={true}
                    ref="2"
                  />
                </View>
              </View>

              <View>
                <View style={styles.formRowButtons}>
                  <TouchableHighlight
                    onPress={() => {
                      this.SubmitForm();
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
                    onPress={() => this.props.navigation.navigate("Register")}
                  >
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>
                        Don't have an account yet?
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
