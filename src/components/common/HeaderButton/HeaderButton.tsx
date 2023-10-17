/**
 * @namespace HeaderButton
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { HeaderButtonProps } from './types';
import { navigationRef } from '@navigation';
import { Pressable } from '@components';
import { generalStyles } from '@styles';
import { ActivityIndicator, Text } from 'react-native';

/**
 * HeaderButton
 *
 * @memberof
 * @param {HeaderButtonProps} params
 *
 * @example
 * // How to use HeaderButton:
 *  <HeaderButton />
 */
const HeaderButton: React.FC<HeaderButtonProps> = ({
  canGoBack,
  label,
  color,
  loading,
  onPress,
  backRoute,
  disabled,
}) => {
  const styles = useStyles(!!loading || !!disabled, color);

  const onPressCancel = async () => {
    try {
      onPress && (await onPress());

      canGoBack ? navigationRef.goBack() : navigationRef.navigate(backRoute);
    } catch (error) {}
  };

  return (
    <Pressable
      onPress={onPressCancel}
      style={[generalStyles.row]}
      disabled={disabled || loading}>
      {loading && <ActivityIndicator size={'small'} style={styles.loader} />}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export default HeaderButton;
