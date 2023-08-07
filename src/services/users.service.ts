import api from '@api';
import { PaginationResponse } from '@common/types';
import { User } from '@common/types/entities';
import { CommunityUser, UpdateUserData } from '@services';

export class UsersService {
  public static async loadProfile() {
    const { data } = await api.get<User>('users/profile');

    return data;
  }

  public static async get(id: string) {
    const response = await api.get<User>(`users/${id}`);
    const { data } = response;
    return data;
  }

  public static async update(id: string, params: UpdateUserData) {
    const { data } = await api.put<User>(`users/${id}`, params);

    return data;
  }

  public static async getCommunityUsers(
    page: number,
    limit: number,
    search?: string,
  ) {
    const { data } = await api.get<PaginationResponse<CommunityUser>>(
      `users?page=${page}&limit=${limit}${search ? `&search=${search}` : ''}`,
    );

    return data;
  }
}
