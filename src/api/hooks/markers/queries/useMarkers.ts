import { CacheKey } from '@api/CacheKey';
import { Marker } from '@common/types/entities';
import { MarkerModel } from '@models';
import MarkersService from '@services/markers';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useMarkers = () => {
  const queryKey = [CacheKey.Markers];

  return useQuery<Marker[], AxiosError, MarkerModel[], string[]>({
    queryKey,
    queryFn: MarkersService.all,
    initialData: [],
    select: data => data.map(marker => new MarkerModel(marker)),
  });
};
