/**
 * @namespace HeaderButton
 * @category
 * @subcategory
 *  */
import React, { FC } from 'react';
import useStyles from './styles';
import { HeaderButtonProps } from './types';
import { Pressable } from '@components';
import { ActivityIndicator, Text } from 'react-native';
import { generalStyles } from '@styles';

/**
 * HeaderButton
 *
 *
 * @memberof
 * @param {HeaderButtonProps} params
 *
 * @example
 * // How to use HeaderButton:
 *  <HeaderButton />
 */
const HeaderButton: FC<HeaderButtonProps> = ({
  label,
  color,
  onPress,
  isLoading,
}) => {
  const styles = useStyles();

  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading}
      style={[generalStyles.row]}>
      {isLoading && (
        <ActivityIndicator size={'small'} style={styles.activityIndicator} />
      )}
      <Text style={[styles.label, { color }]}>{label}</Text>
    </Pressable>
  );
};

export default HeaderButton;
