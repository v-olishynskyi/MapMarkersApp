import { MarkerModel } from '@models';
import { GetMarkersByUserParams, MarkersService } from '@services';
import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useMarkersByUser = (
  userId: string,
  params: GetMarkersByUserParams,
) => {
  const queryKey: QueryKey = ['user-markers', userId, params];

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      MarkersService.paginatedMarkers({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.page,
  });
};
