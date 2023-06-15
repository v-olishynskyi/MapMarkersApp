import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigation } from './';
import { AppStackParamsList } from './types';
import { ProfileView, Settings } from '@screens';

const Stack = createNativeStackNavigator<AppStackParamsList>();

const AppNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="tabs"
      component={TabNavigation}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="profile-view"
      component={ProfileView}
      options={{
        title: 'Профіль',
        headerBackTitle: 'Назад',
      }}
    />
    <Stack.Screen
      name="settings"
      component={Settings}
      options={{
        title: 'Налаштування',
        headerBackTitle: 'Назад',
      }}
    />
  </Stack.Navigator>
);

export default AppNavigation;
