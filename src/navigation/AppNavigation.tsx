import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '@screens';

const Stack = createNativeStackNavigator();

export const AppNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="main" component={SignIn} />
  </Stack.Navigator>
);
