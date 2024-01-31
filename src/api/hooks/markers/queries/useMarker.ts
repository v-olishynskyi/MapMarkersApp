import { CacheKey } from '@api/CacheKey';
import { MarkerModel } from '@models';
import MarkersService from '@services/markers';
import { useQuery } from '@tanstack/react-query';

export const useMarker = (id: string) => {
  const queryKey = [CacheKey.Marker, id];

  return useQuery({
    queryKey,
    queryFn: () => MarkersService.one(id),
    select: marker => new MarkerModel(marker),
  });
};
