import { GroupModel } from '@models';

/**
 * @memberof GroupItem
 * @typedef {Object} GroupItemProps
 */
export type GroupItemProps = {
  group: GroupModel;
  onPress: VoidFunction;
  onPressButton: VoidFunction;
  isProcessing: boolean;
};
