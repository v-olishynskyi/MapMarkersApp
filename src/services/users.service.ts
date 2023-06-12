import api from '@api';
import { CommunityUser } from '@services';

export class UsersService {
  public static async getCommunityUsers() {
    const { data } = await api.get<CommunityUser[]>('users');

    return data;
  }
}
