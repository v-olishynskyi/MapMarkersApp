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
  // return useInfiniteQuery<PaginationResponse<Marker>, AxiosError>({
  //   queryKey,
  //   queryFn: ({ pageParam }) =>
  //     MarkersService.paginatedMarkers({
  //       ...params,
  //       user_id: userId,
  //       page: pageParam as number,
  //     }),
  //   initialPageParam: 1,
  //   initialData: { pages: [], pageParams: [] },
  //   getNextPageParam: lastPage => {
  //     return lastPage?.meta?.next_page ?? undefined;
  //   },
  // });
};
