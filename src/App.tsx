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
import { DarkTheme, DefaultTheme } from '@styles';
import { useStores } from '@store';
import { Dimensions, StyleSheet, useColorScheme } from 'react-native';
import { isPortrait } from '@common/helpers';
import { RootLoading, StatusBar, Toast } from '@components';
import { observer } from 'mobx-react-lite';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Orientations } from '@common/types';
import { useUserCoordinates } from '@common/hooks';

const App = observer(() => {
  const {
    uiStore: { setOrientation, setDark, dark },
    authStore: { isAuth },
    userStore: { loadProfile },
  } = useStores();
  const colorScheme = useColorScheme();

  useUserCoordinates();

  React.useEffect(() => {
    Dimensions.addEventListener('change', () => {
      isPortrait()
        ? setOrientation(Orientations.PORTRAIT)
        : setOrientation(Orientations.LANDSCAPE);
    });
  }, [setOrientation]);

  React.useEffect(() => {
    const isDark = colorScheme === 'dark';
    setDark(isDark);
  }, [colorScheme, setDark]);

  React.useEffect(() => {
    if (isAuth) {
      loadProfile();
    }
  }, [isAuth, loadProfile]);

  return (
    <>
      <StatusBar />
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <NavigationContainer
            ref={navigationRef}
            theme={dark ? DarkTheme : DefaultTheme}>
            <BottomSheetModalProvider>
              <RootLoading>
                <RootNavigation />
              </RootLoading>
            </BottomSheetModalProvider>
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
