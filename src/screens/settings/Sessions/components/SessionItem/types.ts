import { UserSessionModel } from '@models';

/**
 * @memberof SessionItem
 * @typedef {Object} SessionItemProps
 */
export type SessionItemProps = {
  session: UserSessionModel;
  isEditMode: boolean;
  onDelete: (sessionId: string) => Promise<void>;
  onPress: VoidFunction;
  onPressMinus: VoidFunction;
  enableSwipeable?: boolean;
};

export type SwipeableItemHandler = {
  close: VoidFunction;
  openRight: VoidFunction;
};
