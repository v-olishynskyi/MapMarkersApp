import api from '@api/axios';
import { PaginationResponse } from '@common/types';
import { User } from '@common/types/entities';
import { UpdateProfileData } from '@services/profile';
import { CommunityUser, GetUsersParams } from '@services/users';

export default class UsersService {
  public static async get(id: string) {
    const { data } = await api.get<User>(`users/${id}`);

    return data;
  }

  public static async update(id: string, params: UpdateProfileData) {
    const { data } = await api.put<User>(`users/${id}`, params);

    return data;
  }

  public static async getCommunityUsers(params: GetUsersParams) {
    const { data } = await api.get<PaginationResponse<CommunityUser>>(
      'users/paginated',
      { params },
    );

    return data;
  }
}
