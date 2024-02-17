import { StyleProp, ViewStyle } from 'react-native';

/**
 * @memberof Switch
 * @typedef {Object} SwitchProps
 */
export type SwitchProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
};
