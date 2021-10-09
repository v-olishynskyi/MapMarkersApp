import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ProfileSettings } from './types';
import { ProfileSettingsScreens as Screens } from '../screens';
import { BackArrow } from '../components';

const StackNavigator = createStackNavigator<ProfileSettings>();

const ProfileSettingsNavigator = () => {
  return (
    <StackNavigator.Navigator
      initialRouteName="Panel"
      screenOptions={{
        headerBackImage: () => <BackArrow />,
        headerBackTitleVisible: false,
      }}>
      <StackNavigator.Screen
        name="Panel"
        component={Screens.ProfileSettings}
        options={{ headerTitle: 'Налаштування профілю' }}
      />
    </StackNavigator.Navigator>
  );
};

export default ProfileSettingsNavigator;
