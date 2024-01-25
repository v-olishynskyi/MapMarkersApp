import { Marker, PublicFile } from '@common/types/entities';

export type CreateMarkerData = {
  data: Omit<Marker, 'id' | 'created_at' | 'updated_at' | 'images' | 'author'>;
  images?: PublicFile[];
};

export type UpdateMarkerData = Omit<
  Marker,
  'created_at' | 'updated_at' | 'images'
> & { images?: string[] };
