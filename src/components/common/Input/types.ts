import { StyleProp, ViewStyle, TextInputProps } from 'react-native';

/**
 * @memberof Input
 * @typedef {Object} InputProps
 */
export type InputProps = {
  value: string;
  onChangeText: (value: string) => void;
  error?: string | boolean;
  style?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  caption?: string;
  password?: boolean;
  inputStyle?: StyleProp<ViewStyle>;
} & Partial<Omit<TextInputProps, 'value' | 'onChangeText' | 'style'>>;
