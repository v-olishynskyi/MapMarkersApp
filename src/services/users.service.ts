import api from '@api';

export class UsersService {
  public static async getAllUsers() {
    const { data } = await api.get('users');

    return data;
  }
}
