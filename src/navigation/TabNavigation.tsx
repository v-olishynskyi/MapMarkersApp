import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MapStack, CommunityTab, ProfileTab } from '@screens';
import { TabsStackParamsList } from './types';
import Icon from 'react-native-vector-icons/Ionicons';
import { getTheme } from '@common/helpers';
import { useLocationPermission } from '@common/hooks';

const Tab = createBottomTabNavigator<TabsStackParamsList>();

const TabBarIcons: Record<
  keyof TabsStackParamsList,
  (props: { focused: boolean; color: string; size: number }) => React.ReactNode
> = {
  'map-tab': ({ focused, color }) => (
    <Icon name={focused ? 'map' : 'map-outline'} color={color} size={20} />
  ),
  'community-tab': ({ focused, color }) => (
    <Icon
      name={focused ? 'people' : 'people-outline'}
      color={color}
      size={20}
    />
  ),
  'profile-tab': ({ focused, color }) => (
    <Icon
      name={focused ? 'person' : 'person-outline'}
      color={color}
      size={20}
    />
  ),
};

const TabNavigation = () => {
  const { colors } = getTheme();

  useLocationPermission({ withRequest: true });

  return (
    <Tab.Navigator
      initialRouteName="profile-tab"
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
        name="map-tab"
        options={{
          title: 'Карта',
          tabBarIcon: TabBarIcons['map-tab'],
        }}
        component={MapStack}
      />
      <Tab.Screen
        name="community-tab"
        options={{
          title: 'Спільнота',
          tabBarIcon: TabBarIcons['community-tab'],
        }}
        component={CommunityTab}
      />
      <Tab.Screen
        name="profile-tab"
        options={{ title: 'Профіль', tabBarIcon: TabBarIcons['profile-tab'] }}
        component={ProfileTab}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
