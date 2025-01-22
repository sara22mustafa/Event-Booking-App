import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Splash from "./screens/SplashScreen";
import Login from "./screens/LoginScreen";
import Signup from "./screens/SignupScreen";
import Home from "./screens/HomeScreen";
import Details from "./screens/DetailsScreen";
import UserDashboard from "./screens/UserDashboardScreen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Provider } from "react-redux";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  Main: undefined;
  Home: undefined;
  UserDashboard: undefined; 
  Details: { event: Event };
};

export interface Event {
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

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#007acc",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#e3f1fa",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="UserDashboard"
        component={UserDashboard} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="event-note" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


const App: React.FC = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{
              headerShown: true,
              title: "",
              headerTintColor: "#007acc",  
            }}
          />
          <Stack.Screen name="UserDashboard" component={UserDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
