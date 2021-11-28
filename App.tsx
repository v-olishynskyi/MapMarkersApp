/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { LogBox } from 'react-native';
import { ThemeProvider } from 'react-native-elements';

import RootNavigator from './src/navigation/RootNavigator';
import Geocoder from 'react-native-geocoding';

LogBox.ignoreLogs(['EventEmitter']);

Geocoder.init('AIzaSyC1MNx-ZtousxdQAfVgNd8Fc2j_HEBAeH4', { language: 'ru' });

const App = () => {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
};

export default App;
