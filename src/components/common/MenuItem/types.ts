import { ColorValue, StyleProp, ViewStyle } from 'react-native';

/**
 * @memberof MenuItem
 * @typedef {Object} MenuItemProps
 */
export type MenuItemProps = {
  onPress?: VoidFunction | (() => Promise<any>);
  icon?: React.ReactNode;
  iconColor?: ColorValue;
  label: string;
  secondaryLabel?: string;
  disabled?: boolean;
  isLast?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  actions?: React.ReactNode;
  withoutChevron?: boolean;
};
