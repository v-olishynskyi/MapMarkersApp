import api from '@api';

import { PublicFile } from '@common/types/entities';

export class FilesService {
  public static async uploadFile(formData: FormData) {
    const { data } = await api.post<PublicFile>('files/upload', formData);

    return data;
  }
}
