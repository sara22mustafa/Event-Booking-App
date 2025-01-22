import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import EventCard from "../components/EventCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Event {
  id: number;
  EventName: string;
  date: string;
  price: number;
  image: string;
  location: string;
}

const UserDashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const fetchDashboardEvents = async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) return;

      const response = await fetch(
        `https://678fee9749875e5a1a93deb4.mockapi.io/users/${userId}`
      );
      const userData = await response.json();
      setEvents(userData.selectedEvents || []);
    } catch (error) {
      Alert.alert("Error", "Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveEvent = async (eventId: number) => {
    setRemoveLoading(true);
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) return;

      const userResponse = await fetch(
        `https://678fee9749875e5a1a93deb4.mockapi.io/users/${userId}`
      );
      const user = await userResponse.json();

      const updatedEvents = user.selectedEvents.filter(
        (e: Event) => e.id !== eventId
      );

      await fetch(
        `https://678fee9749875e5a1a93deb4.mockapi.io/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedEvents: updatedEvents }),
        }
      );

      setEvents(updatedEvents);
      Alert.alert("Removed", "Event removed from dashboard");
    } catch (error) {
      Alert.alert("Error", "Failed to remove event");
    } finally {
      setRemoveLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      console.log("i am in the dashboard");
      fetchDashboardEvents();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {removeLoading ? (
        <ActivityIndicator color={"blue"} size={"large"} style={{ flex: 1 }} />
      ) : (
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="#007acc" />
          ) : (
            <>
              <Text style={styles.title}>My Events Dashboard</Text>
              <FlatList
                data={events}
                renderItem={({ item }) => (
                  <View style={styles.eventContainer}>
                    <EventCard event={item} />
                    <View
                      style={{
                        width: "40%",
                        alignSelf: "center",
                        borderRadius: 10, 
                        overflow: "hidden", 
                      }}
                    >
                      <Button
                        title="Remove Event"
                        onPress={() => handleRemoveEvent(item.id)}
                        color="#ff4444"
                      />
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                overScrollMode="never" // Disables the overscroll effect on Android
                ListEmptyComponent={
                  <Text style={styles.emptyText}>
                    No events in your dashboard yet!
                  </Text>
                }
              />
            </>
          )}
        </View>
      )}

      <TouchableOpacity
        onPress={() => {
          AsyncStorage.removeItem("userId");
          navigation.navigate("Login");
        }}
        style={{
          position: "absolute",
          bottom: "2%",
          right: "5%",
          elevation: 16,
          width: 50,
          height: 50,
          backgroundColor: "red",
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name="logout" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  container: {
    flex: 1,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#007acc",
  },
  eventContainer: {
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 20,
  },
});

export default UserDashboard;
