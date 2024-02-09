import api from '@api/axios';
import { MessageResponse, PaginationResponse } from '@common/types';
import { Group } from '@common/types/entities';
import { GetGroupsParams, JoinLeaveGroupParams } from '@services/groups/types';

export default class GroupsService {
  public static async paginatedGroups(params: GetGroupsParams) {
    const { data } = await api.get<PaginationResponse<Group>>('groups', {
      params,
    });

    return data;
  }

  public static async all(params: Omit<GetGroupsParams, 'page' | 'limit'>) {
    const { data } = await api.get<Group[]>('groups/get-all', { params });

    return data;
  }

  public static async get(id: string) {
    const { data } = await api.get<Group>(`groups/${id}`);

    return data;
  }

  public static async join({ group_id, user_id }: JoinLeaveGroupParams) {
    const { data } = await api.post<MessageResponse>(
      `groups/${group_id}/join`,
      { user_id },
    );

    return data;
  }

  public static async leave({ group_id, user_id }: JoinLeaveGroupParams) {
    const { data } = await api.post<MessageResponse>(
      `groups/${group_id}/leave`,
      { user_id },
    );

    return data;
  }
}
