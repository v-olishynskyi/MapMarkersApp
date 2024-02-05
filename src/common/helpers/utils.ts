import { FileTypes } from '@common/types';
import { useTheme } from '@react-navigation/native';
import { ITheme } from '@styles';
import { Platform } from 'react-native';
import { Image } from 'react-native-image-crop-picker';

export const wait = async (ms: number) =>
  await new Promise(resolve =>
    setTimeout(() => {
      resolve(true);
    }, ms),
  );

export const getTheme = useTheme as () => ITheme;

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

export const getRandomInt = (
  min: number,
  max: number,
  withCeil: boolean = true,
) => {
  min = withCeil ? Math.ceil(min) : min;
  max = withCeil ? Math.floor(max) : max;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const collectFileFormData = (data: Image, type: FileTypes) => {
  const formData = new FormData();
  formData.append('type', type);

  const file = data as Image;

  formData.append('file', {
    name: file.filename || 'filename',
    type: file.mime,
    uri: Platform.OS === 'ios' ? file.path?.replace('file://', '') : file.path,
  } as unknown as Blob);

  return formData;
};
