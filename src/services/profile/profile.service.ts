import api from '@api/axios';
import { User } from '@common/types/entities';
import { UpdateProfileData } from '@services/profile/types';

export default class ProfileService {
  public static async loadProfile() {
    const { data } = await api.get<User>('profile');

    return data;
  }

  public static async updateProfile(body: UpdateProfileData) {
    const { data } = await api.put<User>('profile', body);

    return data;
  }

  public static async uploadAvatar(formData: FormData) {
    const { data } = await api.post<User>('/profile/upload-avatar', formData);

    return data;
  }

  public static async deleteAvatar() {
    const { data } = await api.delete<User>('profile/delete-avatar');

    return data;
  }
}
