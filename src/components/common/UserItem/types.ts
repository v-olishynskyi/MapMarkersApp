import { UserModel } from '@models';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @memberof UserItem
 * @typedef {Object} UserItemProps
 */
export type UserItemProps = {
  user: UserModel;
  onPress?: VoidFunction;
  size?: 'small' | 'normal';
  style?: StyleProp<ViewStyle>;
};
