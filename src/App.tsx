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
import { AppStateStatus, Platform, StyleSheet } from 'react-native';
import { RootLoading, StatusBar, Toast } from '@components';
import { observer } from 'mobx-react-lite';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {
  useAppState,
  useChangeDimensions,
  useOnlineManager,
  useSystemTheme,
  useUserCoordinates,
} from '@common/hooks';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

const App = observer(() => {
  const {
    uiStore: { isDark },
    appStore: { initApplication },
  } = useStores();

  useUserCoordinates();
  useOnlineManager();
  useAppState(onAppStateChange);
  useChangeDimensions();
  useSystemTheme();

  React.useEffect(() => {
    initApplication();
  }, [initApplication]);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar />
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <NavigationContainer
            ref={navigationRef}
            theme={isDark ? DarkTheme : DefaultTheme}>
            <BottomSheetModalProvider>
              <RootLoading>
                <RootNavigation />
              </RootLoading>
            </BottomSheetModalProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
      <Toast />
    </QueryClientProvider>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
