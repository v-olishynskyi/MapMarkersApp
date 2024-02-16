import { CacheKey } from '@api/CacheKey';
import { Marker } from '@common/types/entities';

import MarkersService from '@services/markers';
import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type Options = Omit<
  UndefinedInitialDataOptions<Marker, AxiosError<unknown, any>>,
  'queryKey' | 'select'
>;

export const useMarker = (id: string, options: Options) => {
  const queryKey = [CacheKey.Marker, id];

  return useQuery<Marker, AxiosError, Marker>({
    queryKey,
    queryFn: async () => MarkersService.one(id),
    ...options,
  });
};
