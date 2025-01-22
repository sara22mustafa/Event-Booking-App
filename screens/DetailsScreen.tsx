import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Alert,
  Platform,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList, Event } from '../App';
import { useNavigation } from '@react-navigation/native';

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const Details: React.FC<DetailsProps> = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();
const [isLoading, setIsLoading] = useState(false);
  const handleAddToDashboard =  async() => {
    setIsLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');

      const userResponse = await fetch(
        `https://678fee9749875e5a1a93deb4.mockapi.io/users/${userId}`
      );
      const user = await userResponse.json();
      const isEventExist = user.selectedEvents.some(
        (e: Event) => e.id === event.id
      );

      if (isEventExist) {
        Alert.alert('Warning', 'Event already in dashboard!');
        return;
      }

      const updatedEvents = [...user.selectedEvents, event];
      
      const updateResponse = await fetch(
        `https://678fee9749875e5a1a93deb4.mockapi.io/users/${userId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ selectedEvents: updatedEvents }),
        }
      );

      if (updateResponse.ok) {
        Alert.alert('Success', 'Event added to dashboard! 🎉');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add event');
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
<SafeAreaView style={styles.container}>
<ScrollView >
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{event.EventName}</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.detail}>
            <Text style={styles.label}>Date & Time: </Text>
            {event.date}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Location: </Text>
            {event.location}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Description: </Text>
            {event.Description}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Speakers: </Text>
            {event.speakers?.join(', ') || 'No speakers listed'}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Price: </Text>
            {event.price > 0 ? `$${event.price}` : 'Free'}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Capacity: </Text>
            {event.Capacity}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Available Spots: </Text>
            {event.AvailableSpots}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          {isLoading?<ActivityIndicator color={"white"}style={{padding:"5%"}}/>:<Button
            title="Register"
            onPress={handleAddToDashboard}
             color="#ffffff"
          />}
        </View>
      </View>
    </ScrollView>
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f1fa',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    paddingHorizontal: 4,
  },
  image: {
    width: '100%',
    height: 250,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#007acc',
    textAlign: 'center',
  },
  detailContainer: {
    backgroundColor: '#dbe2e0d1',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  detail: {
    fontSize: 14,
    marginBottom: 12,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    color: '#007acc',
  },
  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#007acc',
    width: '50%',
    marginHorizontal: '25%',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 50,
    color: '#007acc',
  },
});

export default Details;