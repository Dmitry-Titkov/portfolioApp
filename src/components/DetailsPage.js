import React from "react";
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  TouchableHighlight,
  TextInput,
} from "react-native";

export default function StartPage(navigation) {
  const [value, onChangeText] = React.useState("");

  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <Image
        style={{ width: "100%", height: 200, resizeMode: "stretch" }}
        source={{
          uri:
            "https://www.inquirer.com/resizer/JmbnMe9pQTBvgUpraYaR6YBE5f8=/1400x932/smart/arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/KDHKAOOKANC2LHCOA3UNRVNQOE.jpg",
        }}
      />
      <Text>Name</Text>
      <Text>Bids</Text>
      <View
        style={{
          borderBottomColor: "Red",
          borderBottomWidth: 2,
        }}
      >
        <TextInput
          keyboardType="numeric"
          onChangeText={(text) => onChangeText(text)}
          value={value}
        />
      </View>
      <View style={styles.formRowButtons}>
        <TouchableHighlight
          style={styles.buttonTouch}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Bid</Text>
          </View>
        </TouchableHighlight>
      </View>
      <Text>Reviews</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
