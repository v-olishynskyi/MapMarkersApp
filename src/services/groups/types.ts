import { GroupPrivacyCodes } from '@common/types';
import { Group } from '@common/types/entities';
import { PublicFileModel } from '@models';

export type GetAllGroupsParams = {
  search?: string;
  filter_by?: GroupsFilterBy;
  user_id?: string;
};

export type GetGroupsParams = {
  search?: string;
  page?: number;
  limit?: number;
  filter_by?: GroupsFilterBy;
  user_id?: string;
};

export enum GroupsFilterBy {
  All = 'all',
  My_Groups = 'my_groups',
  By_User = 'by_user',
  Public = 'public',
}

export type JoinLeaveGroupParams = {
  user_id: string;
  group_id: string;
};

export type CreateGroupParams = {
  data: {
    name: string;
    description?: string;
    privacy_code: GroupPrivacyCodes;
  };
  avatar: PublicFileModel | null;
};

export type CreateGroupResponse = {
  message: string;
  data: Group;
};
