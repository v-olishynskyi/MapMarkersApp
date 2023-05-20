import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Map, Profile, Users } from '@screens';

const Tab = createBottomTabNavigator();

export const TabNavigation = (
  <Tab.Navigator>
    <Tab.Screen name="map" options={{ title: 'Карта' }} component={Map} />
    <Tab.Screen name="users" options={{ title: 'Юзери' }} component={Users} />
    <Tab.Screen
      name="profile"
      options={{ title: 'Профіль' }}
      component={Profile}
    />
  </Tab.Navigator>
);
