import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Map, Profile, Community } from '@screens';
import { TabsStackParamsList } from './types';
import { ProfileNavigator } from '@navigation';

const Tab = createBottomTabNavigator<TabsStackParamsList>();

const TabNavigation = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="map" options={{ title: 'Карта' }} component={Map} />
    <Tab.Screen
      name="community"
      options={{ title: 'Спільнота' }}
      component={Community}
    />
    <Tab.Screen
      name="profile"
      options={{ title: 'Профіль' }}
      component={ProfileNavigator}
    />
  </Tab.Navigator>
);

export default TabNavigation;
