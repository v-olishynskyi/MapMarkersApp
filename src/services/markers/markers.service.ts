import api from '@api/axios';
import { CreateMarkerData, UpdateMarkerData } from './types';
import { Marker } from '@common/types/entities';
import { PaginationResponse } from '@common/types';
import { GetMarkersByUserParams } from './types';

export default class MarkersService {
  public static async paginatedMarkers({
    limit,
    page,
    search,
  }: GetMarkersByUserParams) {
    const { data } = await api.get<PaginationResponse<Marker>>(
      `markers/paginated?page=${page}&limit=${limit}${
        search ? `&search=${search}` : ''
      }`,
    );

    return data;
  }

  public static async all() {
    const { data } = await api.get<Marker[]>('markers/all');

    return data;
  }

  public static async one(id: string) {
    const { data } = await api.get<Marker>(`markers/${id}`);

    return data;
  }

  public static async create(body: CreateMarkerData) {
    const formData = new FormData();

    body.images?.forEach(file => {
      formData.append('images', {
        name: file.key || '',
        type: file.mime || 'image/jpg',
        uri: file.url,
      } as unknown as Blob);
    });

    formData.append('marker', JSON.stringify(body.data));

    const { data } = await api.post<Marker>('markers', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  }

  public static async update(id: string, body: UpdateMarkerData) {
    const formData = new FormData();

    body.images?.forEach(file => {
      formData.append('images', {
        name: file.key || '',
        type: file.mime || 'image/jpg',
        uri: file.url,
      } as unknown as Blob);
    });

    formData.append('marker', JSON.stringify(body.data));

    const { data } = await api.put<Marker>('markers', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  }

  public static async delete(id: string) {
    const { data } = await api.delete<{ message: string }>(`markers/${id}`);

    return data;
  }
}
