import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { ForgotPassword, Onboarding, SignIn, SignUp } from '@screens';
import { AuthStackParamsList } from './types';
import { globalStorage } from '@utils/Storage';
import { getTheme } from '@utils/helpers';

const Stack = createNativeStackNavigator<AuthStackParamsList>();

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

const AuthNavigation = () => {
  const shouldShowOnboarding = !globalStorage.getBoolean(
    'is-visited-onboarding',
  );

  const { colors } = getTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: styles.content,
        headerStyle: { backgroundColor: colors.background },
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

export default AuthNavigation;
