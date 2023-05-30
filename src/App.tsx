/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigation, navigationRef } from '@navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme } from '@styles';
import { useStores } from '@store';
import { Dimensions } from 'react-native';
import { isPortrait } from '@utils/helpers';

const App = () => {
  const { uiStore } = useStores();

  React.useEffect(() => {
    Dimensions.addEventListener('change', () => {
      isPortrait()
        ? uiStore.setOrientation('portrait')
        : uiStore.setOrientation('landscape');
    });
  }, [uiStore]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef} theme={DefaultTheme}>
          <RootNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
