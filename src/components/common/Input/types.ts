import { StyleProp, ViewStyle, TextInputProps } from 'react-native';

/**
 * @memberof Input
 * @typedef {Object} InputProps
 */
export type InputProps = {
  value: string;
  onChangeText: (value: string) => void;
  error?: string | boolean;
  containerStyle?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  caption?: string;
} & Partial<Omit<TextInputProps, 'value' | 'onChangeText'>>;
