import { useTheme } from '@react-navigation/native';
import { ITheme } from '@styles';
import { Dimensions, Platform } from 'react-native';

export const getTheme = useTheme as () => ITheme;

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

/**
 * Returns true if the screen is in portrait mode
 */
export const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

/**
 * Returns true of the screen is in landscape mode
 */
export const isLandscape = () => {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
};
