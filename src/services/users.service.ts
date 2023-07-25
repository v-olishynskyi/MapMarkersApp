import api from '@api';
import { CommunityUser, IUser, UpdateUserData } from '@services';
import { PaginationResponse } from '@types';

export class UsersService {
  public static async loadProfile() {
    const { data } = await api.get<IUser>('users/profile');

    return data;
  }

  public static async get(id: string) {
    const response = await api.get<IUser>(`users/${id}`);
    const { data } = response;
    return data;
  }

  public static async update(id: string, params: UpdateUserData) {
    const { data } = await api.put<IUser>(`users/${id}`, params);

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
