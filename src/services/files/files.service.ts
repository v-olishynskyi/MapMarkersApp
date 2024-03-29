import api from '@api/axios';
import { MessageResponse } from '@common/types';
import { PublicFile } from '@common/types/entities';

export default class FilesService {
  public static async upload(formData: FormData) {
    const { data } = await api.post<PublicFile>('files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  }

  public static async delete(id: string) {
    const { data } = await api.delete<MessageResponse>(`files/${id}`);

    return data;
  }
}
