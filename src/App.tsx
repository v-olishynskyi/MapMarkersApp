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
import { Dimensions, StyleSheet } from 'react-native';
import { isPortrait } from '@common/helpers';
import { RootLoading, Toast } from '@components';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const {
    uiStore,
    authStore: { isAuth },
    userStore: { loadProfile },
  } = useStores();

  React.useEffect(() => {
    Dimensions.addEventListener('change', () => {
      isPortrait()
        ? uiStore.setOrientation('portrait')
        : uiStore.setOrientation('landscape');
    });
  }, [uiStore]);

  React.useEffect(() => {
    if (isAuth) {
      loadProfile();
    }
  }, [isAuth, loadProfile]);

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef} theme={DefaultTheme}>
            <RootLoading>
              <RootNavigation />
            </RootLoading>
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
      <Toast />
    </>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
