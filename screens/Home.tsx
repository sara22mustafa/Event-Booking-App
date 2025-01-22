import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home : React.FC  = () => {
    return (
        <View style={styles.cc}>
            <Text style={styles.title}>Welcome to Event Booking App</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cc: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Home;