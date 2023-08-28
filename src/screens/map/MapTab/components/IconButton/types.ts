import { StyleProp, ViewStyle } from 'react-native';

/**
 * @memberof IconButton
 * @typedef {Object} IconButtonProps
 */
export type IconButtonProps = {
  iconName: string;
  onPress: VoidFunction | (() => Promise<void>);
  style?: StyleProp<ViewStyle>;
};
