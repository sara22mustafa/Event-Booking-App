import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserDashboard: React.FC = () => {
  return (
    <View style={styles.cc}>
      <Text style={styles.title}>UserDashboard Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cc: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default UserDashboard;
