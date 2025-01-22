import React, { FC } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// Define the component type
const LoginScreen: FC = () => {
    return (
        <View style={styles.cc}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                keyboardType="default"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                autoCapitalize="none"
            />
            <Button title="Login" onPress={() => { console.log('Login pressed'); }} />
        </View>
    );
};

// Define styles
const styles = StyleSheet.create({
    cc: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

// Export the component
export default LoginScreen;
