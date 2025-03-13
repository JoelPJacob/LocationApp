import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const Header = ({ title }) => {
  return (
    <LinearGradient colors={["#FFBB1A", "#FF8800"]} style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default Header;
