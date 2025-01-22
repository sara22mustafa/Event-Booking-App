import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your screens
import Splash from './'
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import Details from '../screens/Details';
import UserDashboard from '../screens/UserDashboard';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for main app screens
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="UserDashboard" component={UserDashboard} />
    </Tab.Navigator>
  );
}

const App : React.FC  = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ animation: 'default' }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ animation: 'default' }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{ animation: 'slide_from_right' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
