/**
 * @namespace PlatformIcon
 * @category
 * @subcategory
 *  */
import React from 'react';
import { View } from 'react-native';
import useStyles from './styles';
import { PlatformIconProps } from './types';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platforms } from '@common/types';
import { getTheme } from '@common/helpers';

/**
 * PlatformIcon
 *
 * @memberof
 * @param {PlatformIconProps} params
 *
 * @example
 * // How to use PlatformIcon:
 *  <PlatformIcon platrofm={Platforms.IOS} size='small' />
 */
const PlatformIcon: React.FC<PlatformIconProps> = ({
  platform,
  size,
  color,
  style,
}) => {
  const styles = useStyles(size);
  const { colors } = getTheme();

  const iconSize = size === 'large' ? 40 : 20;

  return (
    <View style={[styles.container, style]}>
      <Icon
        size={iconSize}
        name={platform === Platforms.ANDROID ? 'logo-android' : 'logo-apple'}
        color={color || colors.card}
      />
    </View>
  );
};

export default PlatformIcon;
