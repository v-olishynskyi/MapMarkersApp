/**
 * @namespace Switch
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { SwitchProps } from './types';
import { Text, View } from 'react-native';
import RNUISwitch from 'react-native-ui-lib/switch';
import { generalStyles } from '@styles';
import { getTheme } from '@common/helpers';

/**
 * Switch
 *
 * @memberof
 * @param {SwitchProps} params
 *
 * @example
 * // How to use Switch:
 *  <Switch value={bool} lalel={"Switch label"} onValueChange={(value) => setSwitchValue(value)} />
 */
const Switch: React.FC<SwitchProps> = ({
  label,
  value,
  onValueChange,
  style,
}) => {
  const { colors } = getTheme();
  const styles = useStyles();

  return (
    <View style={[generalStyles.rowBetween, styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <RNUISwitch
        value={value}
        onValueChange={onValueChange}
        onColor={colors.primary}
      />
    </View>
  );
};

export default Switch;
