import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    navigation.replace("Map");
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFBB1A" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <View style={styles.content}>
        <Text style={styles.title}>Profile Details</Text>
        <View style={styles.profileBox}>
          <Text style={styles.text}>
            <Text style={styles.label}>Name:</Text> {user.name}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Email:</Text> {user.email}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Phone:</Text> {user.phone}
          </Text>
        </View>
        <CustomButton
          title="Logout"
          onPress={handleLogout}
          buttonStyle={{
            backgroundColor: "#FF5722",
            borderRadius: 10,
          }}
        // textStyle={{ fontSize: 18, fontWeight: "bold" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  profileBox: {
    width: "100%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: "#555",
  },
  label: {
    fontWeight: "bold",
    color: "#222",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});

export default ProfileScreen;
