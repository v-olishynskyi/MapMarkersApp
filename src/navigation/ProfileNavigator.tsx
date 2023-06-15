import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ProfileStackParamsList } from '@navigation';
import { ProfileTab } from '@screens';

const Stack = createNativeStackNavigator<ProfileStackParamsList>();

const EditProfile = () => null;

const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
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
