/**
 * @namespace Header
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { HeaderProps } from './types';
import { Text, View } from 'react-native';
import { HeaderButton } from './components';
import { getTheme } from '@utils/helpers';

/**
 * Header
 *
 *
 * @memberof
 * @param {HeaderProps} params
 *
 * @example
 * // How to use Header:
 *  <Header />
 */
const Header: React.FC<HeaderProps> = () => {
  const styles = useStyles();
  const { colors } = getTheme();

  return (
    <View style={styles.container}>
      <HeaderButton color={colors.red} label="Відмінити" onPress={() => {}} />
      <Text style={styles.title}>Редагування профілю</Text>
      <HeaderButton color={colors.red} label="Відмінити" onPress={() => {}} />
    </View>
  );
};

export default Header;
