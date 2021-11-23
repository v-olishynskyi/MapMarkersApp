import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { MainStackParamsList } from './types';
import { StatusBar } from 'react-native';
import Screens from '../screens';
import TabNavigator from './TabNavigator';
import ProfileSettingsNavigator from './ProfileSettingsNavigator';
import { BackArrow } from '../components';
import { hooks } from '../hooks';

const MainStack = createStackNavigator<MainStackParamsList>();

const RootNavigator = () => {
  const navigation =
    React.useRef<StackNavigationProp<MainStackParamsList>>(null);

  const { mainStore, dataStore } = hooks.useStores();

  React.useEffect(() => {
    mainStore
      .getUserInstance()
      .then(isAuth => {
        if (isAuth) {
          navigation.current!.navigate('Main');
        }
      })
      .then(async () => await dataStore.loadMarkers());
  });

  return (
    <NavigationContainer ref={navigation}>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
      <MainStack.Navigator
        screenOptions={{
          headerBackImage: () => <BackArrow />,
          headerBackTitleVisible: false,
        }}>
        <MainStack.Screen
          name="SignIn"
          component={Screens.SignIn}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: '#fff' },
          }}
        />
        <MainStack.Screen
          name="SignUp"
          component={Screens.SignUp}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: '#fff' },
          }}
        />
        <MainStack.Screen
          name="ConfirmAccount"
          component={Screens.ConfirmAccount}
          options={{
            title: 'Підтвердження',
            headerTintColor: '#fff',
            headerTransparent: true,
            cardStyle: { backgroundColor: '#fff' },
            headerBackImage: () => <BackArrow color={'#fff'} />,
          }}
        />

        <MainStack.Screen
          name="ProfileSettings"
          component={ProfileSettingsNavigator}
          options={{ headerShown: false }}
        />

        <MainStack.Screen
          name="Comments"
          component={Screens.Comments}
          options={{ headerTitle: 'Коментарі', headerTitleAlign: 'center' }}
        />

        <MainStack.Screen
          name="Markers"
          component={Screens.Markers}
          options={{ headerTitle: 'Маркери', headerTitleAlign: 'center' }}
        />

        <MainStack.Screen
          name="Comment"
          component={Screens.Comments}
          options={{ headerTitle: 'Коментар', headerTitleAlign: 'center' }}
        />

        <MainStack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
