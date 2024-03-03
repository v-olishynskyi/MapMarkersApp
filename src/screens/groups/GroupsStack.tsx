import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditGroup, GroupView, CreateGroup } from '@screens';
import { GroupsStackParamsList } from '@navigation';

const Stack = createNativeStackNavigator<GroupsStackParamsList>();

const GroupsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="group-view"
        component={GroupView}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="edit-group"
        component={EditGroup}
        options={{
          presentation: 'modal',
          headerShown: true,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="create-group" component={CreateGroup} />
    </Stack.Navigator>
  );
};

export default GroupsStack;
