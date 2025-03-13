import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        const user = await AsyncStorage.getItem("user");

        console.warn("isLoggedIn:", isLoggedIn);
        console.warn("user:", user);

        if (isLoggedIn === "true" && user) {
          Alert.alert("User is logged in");
          console.warn("Navigating to BottomTab");
          navigation.replace("BottomTab"); 
        } else {
          console.warn("Navigating to Login");
          navigation.replace("Login");
        }
      } catch (error) {
        console.error("Error fetching login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Map App</Text>
      <ActivityIndicator size="large" color="#FFBB1A" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default SplashScreen;
