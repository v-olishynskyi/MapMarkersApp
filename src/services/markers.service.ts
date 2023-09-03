import api from '@api';
import { CreateMarkerData, UpdateMarkerData } from './markers.model';
import { Marker } from '@common/types/entities';
import { faker } from '@faker-js/faker';
import { wait } from '@common/helpers';

export class MarkersService {
  public static async create(body: CreateMarkerData) {
    await wait(3000);
    const marker: Marker = {
      ...body,
      id: faker.string.uuid(),
      created_at: new Date(),
      updated_at: new Date(),
    };
    // const { data } = await api.post<Marker>('markers', body);

    // return data;

    return marker;
  }

  public static async update(body: UpdateMarkerData) {
    const { data } = await api.put<Marker>('markers', body);

    return data;
  }

  public static async delete(id: string) {
    const { data } = await api.delete<{ message: string }>(`markers/${id}`);

    return data;
  }
}
