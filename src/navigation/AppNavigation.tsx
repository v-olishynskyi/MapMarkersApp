import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigation } from './';
import { AppStackParamsList } from './types';
import { ProfileView } from '@screens';

const Stack = createNativeStackNavigator<AppStackParamsList>();

const AppNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="tabs" component={TabNavigation} />
    <Stack.Screen
      name="profile-view"
      component={ProfileView}
      options={{ headerShown: true, title: 'Профіль' }}
    />
  </Stack.Navigator>
);

export default AppNavigation;
