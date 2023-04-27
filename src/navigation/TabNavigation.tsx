import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

export const TabNavigation = (
  <Tab.Navigator>
    <Tab.Screen
      name="home"
      component={
        <View>
          <Text>home</Text>
        </View>
      }
    />
    <Tab.Screen
      name="map"
      component={
        <View>
          <Text>map</Text>
        </View>
      }
    />
    <Tab.Screen
      name="profile"
      component={
        <View>
          <Text>profile</Text>
        </View>
      }
    />
  </Tab.Navigator>
);
