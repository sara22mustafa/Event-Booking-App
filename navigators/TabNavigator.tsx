// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
// import Home from '../screens/Home';
// import UserDashboard from '../screens/UserDashboard';

// const Tab = createBottomTabNavigator();

// const TabNavigator: React.FC = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarHideOnKeyboard: true, // Hides tab bar when keyboard is open
//         headerShown: false, // Hides header for all screens in the tab navigator
//         tabBarShowLabel: false, // Hides labels on the tab bar
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={
//           {
//             // Add specific options for the Home screen here, if needed
//           } as BottomTabNavigationOptions
//         }
//       />
//        <Tab.Screen
//         name="UserDashboard"
//         component={UserDashboard}
//         options={
//           {
//             // Add specific options for the Home screen here, if needed
//           } as BottomTabNavigationOptions
//         }
//       />
//     </Tab.Navigator>
//   );
// };

// export default TabNavigator;
