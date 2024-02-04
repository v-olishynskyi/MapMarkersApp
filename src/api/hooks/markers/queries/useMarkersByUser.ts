import { QueryKey, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import MarkersService from '@services/markers';
import { CacheKey } from '@api/CacheKey';
import { Marker } from '@common/types/entities';
import { MarkerModel } from '@models';

export const useMarkersByUser = (userId: string) => {
  const queryKey: QueryKey = [CacheKey.MarkersByUser, userId];

  return useQuery<Marker[], AxiosError, MarkerModel[]>({
    queryKey,
    queryFn: () => MarkersService.markersByUserId(userId),
    initialData: [],
    select: markers => markers.map(marker => new MarkerModel(marker)),
  });
};
