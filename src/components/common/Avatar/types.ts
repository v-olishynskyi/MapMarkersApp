import { AvatarProps as RNUiLibAvatarProps } from 'react-native-ui-lib';

/**
 * @memberof Avatar
 * @typedef {Object} AvatarProps
 */
export type AvatarProps = {
  url?: string | null;
  fullname: string;
  initials: string;
  size?: number;
} & Omit<RNUiLibAvatarProps, 'size'>;
