import api from '@api';
import { CreateMarkerData, UpdateMarkerData } from './markers.model';
import { Marker } from '@common/types/entities';

export class MarkersService {
  public static async getAll() {
    const { data } = await api.get<Marker[]>('markers/all');

    return data;
  }

  public static async getOne(id: string) {
    const { data } = await api.get<Marker>(`markers/${id}`);

    return data;
  }

  public static async create(body: CreateMarkerData) {
    const { data } = await api.post<Marker>('markers', body);

    return data;
  }

  public static async update(id: string, body: UpdateMarkerData) {
    const { data } = await api.put<Marker>(`markers/${id}`, body);

    return data;
  }

  public static async delete(id: string) {
    const { data } = await api.delete<{ message: string }>(`markers/${id}`);

    return data;
  }
}
