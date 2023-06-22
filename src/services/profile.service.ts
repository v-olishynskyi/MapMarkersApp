import api from '@api';
import { UpdateProfileData, User } from '@services';

export class ProfileService {
  public static async loadProfile() {
    const { data } = await api.get<User>('users/profile');

    return data;
  }

  public static async updateProfile(id: string, data: UpdateProfileData) {
    const { data: response } = await api.put<User>(`users/${id}`, data);

    return response;
  }
}
