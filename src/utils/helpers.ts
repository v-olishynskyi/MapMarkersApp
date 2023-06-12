import { useTheme } from '@react-navigation/native';
import { ITheme } from '@styles';
import { Dimensions, Platform } from 'react-native';
import Toast, { ToastShowParams } from 'react-native-toast-message';

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

export const wait = async (ms: number) =>
  await new Promise(resolve =>
    setTimeout(() => {
      resolve(true);
    }, ms),
  );

export const showToast = (
  type: 'success' | 'error' | 'info',
  message: string,
  title?: string,
  ...rest: Omit<ToastShowParams, 'type' | 'text1' | 'text2'>[]
) => {
  const toastTitle = title || `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
  const toastMessage = message || '';

  Toast.show({ type, text1: toastTitle, text2: toastMessage, ...rest });
};
