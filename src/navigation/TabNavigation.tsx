import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Map, Community } from '@screens';
import { TabsStackParamsList } from './types';
import { ProfileNavigator } from '@navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { getTheme } from '@utils/helpers';

const Tab = createBottomTabNavigator<TabsStackParamsList>();

const TabBarIcons: Record<
  keyof TabsStackParamsList,
  (props: { focused: boolean; color: string; size: number }) => React.ReactNode
> = {
  map: ({ focused, color }) => (
    <Icon name={focused ? 'map' : 'map-outline'} color={color} size={20} />
  ),
  community: ({ focused, color }) => (
    <Icon
      name={focused ? 'people' : 'people-outline'}
      color={color}
      size={20}
    />
  ),
  profile: ({ focused, color }) => (
    <Icon
      name={focused ? 'person' : 'person-outline'}
      color={color}
      size={20}
    />
  ),
};

const TabNavigation = () => {
  const { colors } = getTheme();

  return (
    <Tab.Navigator
      initialRouteName="profile"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 18,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
          backgroundColor: colors.background,
        },
      }}
      sceneContainerStyle={{ backgroundColor: colors.background }}>
      <Tab.Screen
        name="map"
        options={{
          title: 'Карта',
          tabBarIcon: TabBarIcons.map,
        }}
        component={Map}
      />
      <Tab.Screen
        name="community"
        options={{ title: 'Спільнота', tabBarIcon: TabBarIcons.community }}
        component={Community}
      />
      <Tab.Screen
        name="profile"
        options={{ title: 'Профіль', tabBarIcon: TabBarIcons.profile }}
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
