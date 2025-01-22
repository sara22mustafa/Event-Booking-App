import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Event , RootStackParamList} from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface EventCardProps {
  event: Event|any;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { event })}
    >
      <View style={{  justifyContent: 'center', alignItems: 'center',    padding: 8,
       }}>
        <Image source={{ uri: event.image }} style={styles.image} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{event.EventName}</Text>
        <Text style={styles.date}>{event.date}</Text>
        <Text style={styles.location}>{event.location}</Text>
        <Text style={styles.price}>${event.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#e3f1fa',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // For Android
    // padding: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007acc',
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  location: {
    fontSize: 14,
    color: 'gray',
  },
  price: {
    fontSize: 16,
    fontWeight: '300',
    color: '#007accca',
  },
});

export default EventCard;