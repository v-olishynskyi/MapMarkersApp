import api from '@api';
import { User } from '@services';

export class ProfileService {
  public static async loadProfile() {
    const { data } = await api.get<User>('users/profile');

    return data;
  }
}
