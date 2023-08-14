import { Platforms } from '@common/types';
import { ColorValue, StyleProp, ViewStyle } from 'react-native';

export type IconSize = 'small' | 'large';

/**
 * @memberof PlatformIcon
 * @typedef {Object} PlatformIconProps
 */
export type PlatformIconProps = {
  size: IconSize;
  platform: Platforms;
  color?: ColorValue;
  style?: StyleProp<ViewStyle>;
};
