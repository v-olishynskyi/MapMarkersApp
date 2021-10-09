import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import { MainStackParamsList, TabParamsList } from './types';
import { TabScreen as Screen } from '../screens';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

const Tabs = createBottomTabNavigator<TabParamsList>();

type Navigation = StackNavigationProp<MainStackParamsList>;

const TabNavigator = () => {
  const navigation = useNavigation<Navigation>();

  const handlePressProfileSettings = () => {
    navigation.push('ProfileSettings');
  };

  return (
    <Tabs.Navigator initialRouteName={'ПРОФІЛЬ'}>
      <Tabs.Screen
        name="КАРТА"
        component={Screen.Map}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <Icon name="map" type="font-awesome-5" solid={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="ПРОФІЛЬ"
        component={Screen.Profile}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <Icon name="user-circle" type="font-awesome-5" solid={focused} />
          ),
          headerRight: () => (
            <View style={{ marginRight: 16 }}>
              <Icon
                name="edit"
                type="font-awesome-5"
                onPress={handlePressProfileSettings}
              />
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
