import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeArea } from  "../../components/utility/safe-area.component";
import { Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { RestaurantsNavigator } from './restaurant.navigator';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Settings: "md-settings",
  Map:"md-map",
}

const Settings = () => <SafeArea><Text>Settings</Text></SafeArea>
const Map = () => <SafeArea><Text>Map</Text></SafeArea>
            

const createScreenOptions = ({route}) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => <Ionicons name={iconName} size={size} color={color} />,
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
    headerShown: false,
  }
};

export const AppNavigator = () => (


<NavigationContainer>
<Tab.Navigator
  screenOptions={createScreenOptions}
>
  <Tab.Screen name="Restaurants" component={RestaurantsNavigator}></Tab.Screen>
  <Tab.Screen name="Map" component={Map}></Tab.Screen>
  <Tab.Screen name="Settings" component={Settings}></Tab.Screen>
</Tab.Navigator>

</NavigationContainer>
);