import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, SafeAreaView, ActivityIndicator, Platform } from 'react-native';
import EventCard from '../components/EventCard';
import { useNavigation } from '@react-navigation/native';
interface Event {
  id: number;
  EventName: string;
  date: string;
  price: number;
  image: string;
  location: string;
  Description: string;
  speakers: string[];
  Capacity: number;
  AvailableSpots: number;
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://678fee9749875e5a1a93deb4.mockapi.io/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        setEvents(await response.json());
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator style={{flex:1}} size="large" color="#007acc" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            <Text style={styles.title}>Upcoming Events</Text>
            <FlatList
              data={events}
              renderItem={({ item }) => <EventCard event={item} />}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  container: {
    flex: 1,
    padding: 12,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#007acc',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;