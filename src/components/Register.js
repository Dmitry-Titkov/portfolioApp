import React, { useState } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Text,
  View,
  Alert,
  TextInput,
} from "react-native";
import { signUp } from "../store/user/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Rgister({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setrePassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const dispatch = useDispatch();

  function SubmitForm() {
    dispatch(signUp(displayName, email, password));
  }

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
                  onChange={(event) => setDisplayName(event.target.value)}
                  value={displayName}
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
                  style={[styles.formInputText]}
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
                  placeholder="Confirm password..."
                  underlineColorAndroid="rgba(0, 0, 0, 0)"
                  onChange={(event) => setrePassword(event.target.value)}
                  value={repassword}
                  autoCorrect={false}
                  secureTextEntry={true}
                />
              </View>
            </View>

            <View>
              <View style={styles.formRowButtons}>
                <TouchableHighlight
                  onPress={() => {
                    SubmitForm();
                    navigation.navigate("Login");
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
                  onPress={() => navigation.navigate("Login")}
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
