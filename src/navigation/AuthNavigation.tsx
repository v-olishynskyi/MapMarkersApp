import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { ForgotPassword, SignIn, SignUp } from '@screens';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

export const AuthNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: styles.content,
    }}
    initialRouteName="sign-in">
    <Stack.Screen name="sign-in" component={SignIn} />
    <Stack.Screen name="sign-up" component={SignUp} />
    <Stack.Screen name="forgot-password" component={ForgotPassword} />
  </Stack.Navigator>
);
