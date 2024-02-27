import { SortByDirections } from '@common/types';
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
    images: string[];
  };
  images: PublicFile[];
};

export enum MarkersSortBy {
  Name = 'name',
  UpdatedAt = 'updated_at',
  CreatedAt = 'created_at',
}

export type GetPaginatedMarkersParams = {
  page: number;
  limit: number;
  search?: string;
};

export type GetMarkersByUserParams = {
  sort_by: MarkersSortBy;
  direction: SortByDirections;
};
