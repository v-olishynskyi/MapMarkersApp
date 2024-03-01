import { MarkerModel } from '@models';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @memberof MarkerItem
 * @typedef {Object} MarkerItemProps
 */
export type MarkerItemProps = {
  marker: MarkerModel;
  onPress: VoidFunction;
  style?: StyleProp<ViewStyle>;
};
