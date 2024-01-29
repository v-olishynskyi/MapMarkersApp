import { SharedValue } from 'react-native-reanimated';

/**
 * @memberof AnimatedHeader
 * @typedef {Object} AnimatedHeaderProps
 */
export type AnimatedHeaderProps = {
  isShow: SharedValue<boolean>;
  currentIndex: number;
  numberOfAllItems: number;
  onBack: VoidFunction;
};
