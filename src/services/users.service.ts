import api from '@api';
import { CommunityUser, IUser, UpdateUserData } from '@services';

export class UsersService {
  public static async get(id: string) {
    const response = await api.get<IUser>(`users/${id}`);
    const { data } = response;
    return data;
  }

  public static async update(id: string, params: UpdateUserData) {
    const { data } = await api.put<IUser>(`users/${id}`, params);

    return data;
  }

  public static async getCommunityUsers() {
    const { data } = await api.get<CommunityUser[]>('users');

    return data;
  }
}
