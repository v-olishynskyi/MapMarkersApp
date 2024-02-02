import { PublicFile } from '@common/types/entities';

export type CreateMarkerData = {
  data: {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    author_id: string;
    is_draft: boolean;
    is_hidden: boolean;
  };
  images?: PublicFile[];
};

export type UpdateMarkerData = {
  data: {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    author_id: string;
    is_draft: boolean;
    is_hidden: boolean;
  };
  images: PublicFile[];
};

export type GetMarkersByUserParams = {
  page: number;
  limit: number;
  search?: string;
};
