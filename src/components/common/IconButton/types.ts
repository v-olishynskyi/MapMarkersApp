import { PressableProps } from 'react-native';

/**
 * @memberof IconButton
 * @typedef {Object} IconButtonProps
 */
export type IconButtonProps = PressableProps & {
  icon: string | React.ReactNode;
};
