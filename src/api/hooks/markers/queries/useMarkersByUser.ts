import { MarkerModel } from '@models';
import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import MarkersService, { GetMarkersByUserParams } from '@services/markers';
import { CacheKey } from '@api/CacheKey';

export const useMarkersByUser = (
  userId: string,
  params: GetMarkersByUserParams,
) => {
  const queryKey: QueryKey = [CacheKey.MarkersByUser, userId, params];

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      MarkersService.paginatedMarkers({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.page,
  });
};
