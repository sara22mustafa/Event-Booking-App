import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SignupProps {
  navigation: NavigationProp<any>;
}

const Signup: React.FC<SignupProps> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "https://678fee9749875e5a1a93deb4.mockapi.io/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            email,
            password,
            selectedEvents: [],
            //userId:Date.now().toString()+username, //no need to add userId
          }),
        }
      );
      if (!response.ok) throw new Error("Registration failed");

      const data = await response.json();
      await AsyncStorage.setItem("userId", data.id);
      Alert.alert("Success", "Registration successful!");
      navigation.navigate("Main");
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.loginLink}>Sign up</Text>
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
    backgroundColor: "#f0e1e111",
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  loginText: {
    fontSize: 14,
    color: "#a3aeb4",
  },
  loginLink: {
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

export default Signup;
