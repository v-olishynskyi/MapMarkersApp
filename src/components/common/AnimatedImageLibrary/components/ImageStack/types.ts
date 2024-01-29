import { StyleProp, ViewStyle } from 'react-native';

/**
 * @memberof ImageStack
 * @typedef {Object} ImageStackProps
 */
export type ImageStackProps = {
  containerStyle?: StyleProp<ViewStyle>;
  onPress: VoidFunction;
  images: string[];
};
