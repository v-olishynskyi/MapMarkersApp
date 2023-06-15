import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ProfileStackParamsList } from '@navigation';
import { ProfileTab } from '@screens';
import { getTheme } from '@utils/helpers';

const Stack = createNativeStackNavigator<ProfileStackParamsList>();

const EditProfile = () => null;

const ProfileNavigator = () => {
  const { colors } = getTheme();

  return (
    <Stack.Navigator
      screenOptions={{ contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen
        name="profile-tab"
        component={ProfileTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="edit-profile"
        component={EditProfile}
        options={{ presentation: 'formSheet' }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
