import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "./AuthContext";
import TextInput from "../components/TextInput"; 

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigation = useNavigation();
    const { setIsLoggedIn } = useContext(AuthContext);

    const handleLogin = async () => {
        setEmailError("");
        setPasswordError("");

        if (!email) {
            setEmailError("Email is required");
            return;
        }

        if (!password) {
            setPasswordError("Password is required");
            return;
        }

        const storedUser = await AsyncStorage.getItem("user");

        if (!storedUser) {
            Alert.alert("Error", "User not registered");
            return;
        }

        const user = JSON.parse(storedUser);

        if (user.email === email && user.password === password) {
            await AsyncStorage.setItem("isLoggedIn", "true");
            setIsLoggedIn(true);
            navigation.replace("Home");
        } else {
            Alert.alert("Error", "Invalid email or password");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                title="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                requiredError={emailError}
            />

            <TextInput
                title="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                type="password"
                requiredError={passwordError}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.link}>Don't have an account? Register</Text>
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

export default LoginScreen;
