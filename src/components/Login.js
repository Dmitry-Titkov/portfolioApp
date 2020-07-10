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
} from "react-native";
import { login } from "../store/user/actions";
import { selectToken } from "../store/user/selector";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function submitForm() {
    dispatch(login(email, password));
  }

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
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  autoCorrect={false}
                  keyboardType="email-address"
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
                  style={[styles.formInputText]}
                  placeholder="Password..."
                  underlineColorAndroid="rgba(0, 0, 0, 0)"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                  autoCorrect={false}
                  secureTextEntry={true}
                />
              </View>
            </View>

            <View>
              <View style={styles.formRowButtons}>
                <TouchableHighlight onClick={submitForm}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.formRowButtons}>
                <TouchableHighlight
                  style={styles.buttonTouch}
                  onPress={() => this.props.navigation.navigate("Register")}
                  alert
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
