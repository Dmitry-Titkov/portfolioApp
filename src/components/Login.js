import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState("");
  const dispatch = useDispatch();

  async function FetchUserList() {
    const response = await axios.get(`http://localhost:4000/user`);
    setUserList(response.data);
    console.log(response.data[0].email);
  }

  useEffect(() => {
    FetchUserList();
  }, []);

  function submitForm() {
    dispatch(login(email, password));
  }

  function validationForm() {
    if (email === "" || password === "") {
      window.alert("All fields must be filled in");
    } else {
      if (userList.find((mail) => mail.email === email)) {
        submitForm();
      } else {
        window.alert("User with this email does not exist");
      }
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.body}>
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
              <TouchableHighlight onClick={validationForm}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Login</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.formRowButtons}>
              <TouchableHighlight
                style={styles.buttonTouch}
                onPress={() => navigation.navigate("Register")}
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
