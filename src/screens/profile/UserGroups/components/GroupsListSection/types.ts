import { GroupModel } from '@models';

/**
 * @memberof GroupsListSection
 * @typedef {Object} GroupsListSectionProps
 */
export type GroupsListSectionProps = {
  groups: GroupModel[];
  title: string;
  listEmptyComponents: React.ReactNode;
};
