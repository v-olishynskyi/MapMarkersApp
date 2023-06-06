import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { ForgotPassword, Onboarding, SignIn, SignUp } from '@screens';
import { AuthNavigationStackParamsList } from './types';
import { globalStorage } from '@utils/Storage';

const Stack = createNativeStackNavigator<AuthNavigationStackParamsList>();

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

export const AuthNavigation = () => {
  const shouldShowOnboarding = !globalStorage.getBoolean(
    'is-visited-onboarding',
  );

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: styles.content,
      }}
      initialRouteName={shouldShowOnboarding ? 'onboarding' : 'sign-in'}>
      {shouldShowOnboarding && (
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false }}
          component={Onboarding}
        />
      )}
      <Stack.Screen
        name="sign-in"
        options={{ title: 'Авторизація' }}
        component={SignIn}
      />
      <Stack.Screen
        name="sign-up"
        options={{ title: 'Реєстрація' }}
        component={SignUp}
      />
      <Stack.Screen
        name="forgot-password"
        options={{ title: 'Відновлення паролю' }}
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
};
