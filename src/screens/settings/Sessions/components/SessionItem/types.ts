import { UserSessionModel } from '@models';
import Swipeable from 'react-native-gesture-handler/Swipeable';

/**
 * @memberof SessionItem
 * @typedef {Object} SessionItemProps
 */
export type SessionItemProps = {
  session: UserSessionModel;
  isEditMode: boolean;
  onDelete: () => Promise<void>;
  onPress: VoidFunction;
  onPressMinus: VoidFunction;
  setRef: (ref: Swipeable) => void;
};
