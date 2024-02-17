import { MenuItemProps } from '@components/common/MenuItem/types';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @memberof Menu
 * @typedef {Object} MenuProps
 */
export type MenuProps = {
  items?: Array<MenuItemProps>;
  style?: StyleProp<ViewStyle>;
  headerText?: string;
  footerText?: string;
} & { children?: any };
