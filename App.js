import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FrontPage from "./src/component/FrontPage";

export default function App() {
  return <FrontPage />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
