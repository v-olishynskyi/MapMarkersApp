import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ProfileStackParamsList } from '@navigation';
import { Profile, ProfileTab } from '@screens';

const Stack = createNativeStackNavigator<ProfileStackParamsList>();

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
        component={Profile}
        options={{ presentation: 'formSheet' }}
      />
      <Stack.Screen name="profile-view" component={Profile} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
