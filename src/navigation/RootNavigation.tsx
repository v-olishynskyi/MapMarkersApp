import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigation } from './AuthNavigation';
import { AppNavigation } from './AppNavigation';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator>
      {true ? <AuthNavigation /> : <AppNavigation />}
    </Stack.Navigator>
  );
};

export default RootNavigation;
