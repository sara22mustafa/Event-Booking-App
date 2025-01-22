import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

interface SplashProps {
  navigation: SplashScreenNavigationProp;
}

const Splash: React.FC<SplashProps> = ({ navigation }) => {

  const handleNext = () => {
    navigation.replace('Login'); 
  };

  return (
    <View style={styles.container}>
            <Text style={styles.appName}>Event Booking App</Text>

      <Image
        source={require('../assets/event.jpg')}
        style={styles.splashImage}
        resizeMode="contain" 
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  splashImage: {
    width: '80%',
    height: '40%',
  },
  appName: {
    fontSize: 32,
    fontWeight: '600',
    color: '#007acc', 
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007acc', 
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Splash;