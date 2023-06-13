import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigation } from './';

const Stack = createNativeStackNavigator();

const AppNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="tabs" component={TabNavigation} />
  </Stack.Navigator>
);

export default AppNavigation;
