import { useTheme } from '@react-navigation/native';
import { ITheme } from '@styles';
import { Platform } from 'react-native';

export const wait = async (ms: number) =>
  await new Promise(resolve =>
    setTimeout(() => {
      resolve(true);
    }, ms),
  );

export const getTheme = useTheme as () => ITheme;

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
