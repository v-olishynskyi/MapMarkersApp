export type GetGroupsParams = {
  search?: string;
  page?: number;
  limit?: number;
  filter_by?: GroupsFilterBy;
};

export enum GroupsFilterBy {
  All = 'all',
  My_Groups = 'my_groups',
  Public = 'public',
}

export type JoinLeaveGroupParams = {
  user_id: string;
  group_id: string;
};
