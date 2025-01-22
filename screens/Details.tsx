import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Details: React.FC  = () => {
    return (
        <View style={styles.cc}>
            <Text style={styles.text}>Event Details</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cc: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Details;