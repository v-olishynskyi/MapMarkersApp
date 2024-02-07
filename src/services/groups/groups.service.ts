import api from '@api/axios';
import { MessageResponse, PaginationResponse } from '@common/types';
import { Group } from '@common/types/entities';
import { GetGroupsParams } from '@services/groups/types';

export default class GroupsService {
  public static async paginatedGroups(params: GetGroupsParams) {
    const { data } = await api.get<PaginationResponse<Group>>(
      'groups/paginated',
      { params },
    );

    return data;
  }

  public static async all(params: GetGroupsParams) {
    const { data } = await api.get<Group[]>('groups/all', { params });

    return data;
  }

  public static async get(id: string) {
    const { data } = await api.get<Group>(`groups/${id}`);

    return data;
  }

  public static async join(group_id: string) {
    const { data } = await api.post<MessageResponse>(`groups/${group_id}/join`);

    return data;
  }
}
