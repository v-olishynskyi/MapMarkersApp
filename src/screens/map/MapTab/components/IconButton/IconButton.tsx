/**
 * @namespace IconButton
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { IconButtonProps } from './types';
import { Pressable } from '@components';
import Icon from 'react-native-vector-icons/Ionicons';
import { getTheme } from '@common/helpers';

/**
 * IconButton
 *
 * @memberof
 * @param {IconButtonProps} params
 *
 * @example
 * // How to use IconButton:
 *  <IconButton />
 */
const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  onPress,
  style,
}) => {
  const styles = useStyles();
  const { colors } = getTheme();

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <Icon name={iconName} size={32} color={colors.text} />
    </Pressable>
  );
};

export default IconButton;
