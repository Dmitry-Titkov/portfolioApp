import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SetAuction from "./src/component/SetAuction";

export default function App() {
  return <SetAuction />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
