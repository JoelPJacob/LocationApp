import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import TextInput from "../components/TextInput"; // Import the custom TextInput component

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!name || !email || !password || !phone) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const user = { name, email, password, phone };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    Alert.alert("Success", "Registration successful");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {/* Name Input */}
      <TextInput
        title="Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        customStyle={styles.input}
      />

      {/* Email Input */}
      <TextInput
        title="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        customStyle={styles.input}
      />

      {/* Password Input */}
      <TextInput
        title="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        type="password" // Enable password toggle
        customStyle={styles.input}
      />

      {/* Phone Input */}
      <TextInput
        title="Phone"
        placeholder="Enter your phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        customStyle={styles.input}
      />

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 56,
    borderColor: "#CCC",
    borderWidth: 0.6,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
  },
  button: {
    backgroundColor: "#FFBB1A",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    marginTop: 16,
    color: "#FFBB1A",
    textAlign: "center",
  },
});

export default RegisterScreen;