import { Marker } from '@common/types/entities';

export type CreateMarkerData = Omit<
  Marker,
  'id' | 'created_at' | 'updated_at' | 'images' | 'user'
> & { images?: string[] };

export type UpdateMarkerData = CreateMarkerData;
