import { UserSessionModel } from '@models';

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
};

export type SwipeableItemHandler = {
  close: VoidFunction;
  openRight: VoidFunction;
};
