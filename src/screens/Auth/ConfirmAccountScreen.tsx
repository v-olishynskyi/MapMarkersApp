import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { Card } from 'react-native-elements';
import { hooks } from '../../hooks';
import { MainStackParamsList } from '../../navigation/types';
import { IS_ANDROID } from '../../utils/constants';

interface ConfirmAccountScreenProps {}

const ConfirmAccountScreen = () => {
  const navigation = useNavigation<MainStackParamsList>();

  const { authStore } = hooks.useStores();

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
    IS_ANDROID && StatusBar.setBackgroundColor('#000');

    return () => {
      StatusBar.setBarStyle('dark-content');
      IS_ANDROID && StatusBar.setBackgroundColor('#fff');
    };
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/BluredMap.jpg')}
      style={styles.fullSize}>
      <View style={styles.container}></View>
    </ImageBackground>
  );
};

export default ConfirmAccountScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  fullSize: {
    flex: 1,
  },
});
