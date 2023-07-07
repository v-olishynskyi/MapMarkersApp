import api from '@api';
import { UpdateProfileData, IUser } from '@services';

export class ProfileService {
  public static async loadProfile() {
    const { data } = await api.get<IUser>('users/profile');

    return data;
  }

  public static async updateProfile(id: string, data: UpdateProfileData) {
    const { data: response } = await api.put<IUser>(`users/${id}`, data);

    return response;
  }
}
