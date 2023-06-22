/**
 * @namespace AboutUs
 * @category Screen
 *  */
import React from 'react';
import useStyles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';

/**
 * AboutUs
 *
 *
 * @memberof App
 *
 * @example
 * // How to use AboutUs:
 *  <AboutUs />
 */
const AboutUs: React.FC = () => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appName}>Markers app</Text>
      <Text>Тут колись буде опис додатку</Text>
    </SafeAreaView>
  );
};

export default AboutUs;
