import { PublicFile } from '@common/types/entities';

export type CreateMarkerData = {
  data: {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
  };
  images?: PublicFile[];
};

export type UpdateMarkerData = {
  data: {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
  };
  images: PublicFile[];
};

export type GetMarkersByUserParams = {
  page: number;
  limit: number;
  search?: string;
};
