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
import { getTheme, isTypeof } from '@common/helpers';
import { StyleProp, ViewStyle } from 'react-native';

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
const IconButton: React.FC<IconButtonProps> = ({ icon, ...rest }) => {
  const styles = useStyles();
  const { colors } = getTheme();

  const iconComponent = isTypeof(icon, 'string') ? (
    <Icon
      name={icon as string}
      color={colors.text}
      size={16}
      style={styles.icon}
    />
  ) : (
    icon
  );

  return (
    <Pressable
      {...rest}
      style={[styles.container, rest.style as StyleProp<ViewStyle>]}>
      {iconComponent}
    </Pressable>
  );
};

export default IconButton;
