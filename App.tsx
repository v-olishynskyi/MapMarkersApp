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

LogBox.ignoreLogs(['EventEmitter']);

const App = () => {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
};

export default App;
