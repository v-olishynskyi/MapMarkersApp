import { QueryKey, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import MarkersService, { GetMarkersByUserParams } from '@services/markers';
import { CacheKey } from '@api/CacheKey';
import { Marker } from '@common/types/entities';
import { MarkerModel } from '@models';

export const useMarkersByUser = (
  userId: string,
  params: GetMarkersByUserParams,
) => {
  const queryKey: QueryKey = [CacheKey.MarkersByUser, userId, params];

  return useQuery<Marker[], AxiosError, MarkerModel[]>({
    queryKey,
    queryFn: () => MarkersService.markersByUserId(userId, params),
    initialData: [],
    select: markers => markers.map(marker => new MarkerModel(marker)),
  });
};
