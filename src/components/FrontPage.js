import React, { Component } from "react";
import {
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Text,
  View,
  StatusBar,
  TextInput,
  FlatList,
  Image,
  AsyncStorage,
  NetInfo,
} from "react-native";

class FrontPage extends React.Component {
  state = {
    respoData: "",
    networkResponse: "",
    statusColor: "rgba(0,255,0,0.8)",
    isConnected: null,
  };

  render() {
    return (
      <View style={([styles.container], { paddingBottom: 53, paddingTop: 53 })}>
        <ScrollView>
          <View style={styles.body}>
            {this.state.respoData ? (
              <FlatList
                data={this.state.respoData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableHighlight
                    onPress={this.viewProduct.bind(this, item)}
                    underlayColor={"blue"}
                  >
                    <View
                      style={{
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: "blue",
                        flex: 1,
                        flexDirection: "row",
                      }}
                    >
                      <View>
                        <Image
                          style={{ width: 80, height: 80, borderRadius: 50 }}
                          source={{
                            uri:
                              "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.expatica.com%2Fnl%2Ffinance%2Finsurance%2Fcar-insurance-in-the-netherlands-115185%2F&psig=AOvVaw1YMXILKwBkHOnP51S-XaNl&ust=1593226558393000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKCYkMq9nuoCFQAAAAAdAAAAABAE",
                          }}
                        />
                      </View>
                      <View style={{ paddingLeft: 10 }}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            color: "Black",
                          }}
                        >
                          {item.product_name}
                        </Text>
                        <Text>
                          <Text style={styles.label}>Starting price</Text>{" "}
                          {item.minimal_price}
                        </Text>
                        {item.hasBid ? (
                          <Text
                            style={{
                              paddingTop: 5,
                              color: "rgba(25, 43, 62, 0.9)",
                            }}
                          >
                            <Text style={styles.label}>Highest bid</Text> &nbsp;
                            {item.high_price}
                          </Text>
                        ) : (
                          <Text style={{ fontWeight: "bold" }}>
                            Not bids yet
                          </Text>
                        )}
                        <Text
                          style={{
                            paddingTop: 5,
                            color: "rgba(25, 43, 62, 0.9)",
                          }}
                        >
                          <Text style={styles.label}>Ends on</Text> &nbsp;
                          {item.end_date_time}
                          &nbsp;&nbsp;&nbsp;
                        </Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                )}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: this.state.statusColor,
                }}
              >
                <Text style={{ color: "#555" }}>
                  {this.state.networkResponse
                    ? this.state.networkResponse
                    : "Loading..."}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
  viewProduct(details) {
    Actions.product({ product: details });
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

export default FrontPage;
