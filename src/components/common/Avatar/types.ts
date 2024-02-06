import { StyleProp, ViewStyle } from 'react-native';

/**
 * @memberof Avatar
 * @typedef {Object} AvatarProps
 */
export type AvatarProps = {
  url?: string | null;
  fullname: string;
  initials: string;
  size?: number;
  onPress?: VoidFunction;
  containerStyle?: StyleProp<ViewStyle>;
};
