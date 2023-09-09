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
import { useStores } from '@store';

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
  const {
    uiStore: { dark },
  } = useStores();

  const iconComponent = isTypeof(icon, 'string') ? (
    <Icon name={icon as string} color={colors.text} size={16} />
  ) : (
    icon
  );

  return (
    <Pressable style={[styles.container]} {...rest}>
      {iconComponent}
    </Pressable>
  );
};

export default IconButton;
