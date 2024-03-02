import { GroupModel } from '@models';

/**
 * @memberof GroupActionButton
 * @typedef {Object} GroupActionButtonProps
 */
export type GroupActionButtonProps = {
  group: GroupModel;
  isOwner: boolean;
};

export enum GroupActions {
  JOIN = 'join',
  LEAVE = 'leave',
  EDIT = 'edit',
}
