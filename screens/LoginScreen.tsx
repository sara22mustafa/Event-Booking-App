import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginProps {
  navigation: NavigationProp<any>;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://678fee9749875e5a1a93deb4.mockapi.io/users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users.");
      }

      const data = await response.json();

      const user = data.find(
        (user: { email: string; password: string }) =>
          user.email === email && user.password === password
      );

      if (user) {
        await AsyncStorage.setItem("userId", user.id);
        Alert.alert("Success", "Login successful!");
        navigation.navigate("Main");
      } else {
        Alert.alert("Error", "Invalid credentials. Please try again.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error during login:", error);
        Alert.alert(
          "Error",
          error.message || "An error occurred during login."
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: " #f0e1e111",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#007acc",
    marginBottom: 24,
    textAlign: "center",
    fontFamily: "Arial",
  },
  input: {
    height: 40,
    borderColor: "#007acc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#dbe2e0d1",
  },
  button: {
    backgroundColor: "#007acc",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    marginHorizontal: "30%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  signupText: {
    fontSize: 14,
    color: "#a3aeb4",
  },
  signupLink: {
    color: "#007acc",
    fontWeight: "600",
  },
  fullWidthTouchable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
});

export default Login;
