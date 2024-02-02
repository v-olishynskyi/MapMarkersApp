import { CacheKey } from '@api/CacheKey';
import { MutationKey } from '@api/MutationKey';
import { defaultErrorHandler } from '@common/helpers';
import { Marker } from '@common/types/entities';
import MarkersService, { UpdateMarkerData } from '@services/markers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUpdateMarker = (id: string) => {
  const mutationKey = [MutationKey.UpdateMarker];

  const queryClient = useQueryClient();

  return useMutation<Marker, AxiosError, UpdateMarkerData>({
    mutationKey,
    mutationFn: data => MarkersService.update(id, data),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [CacheKey.Markers],
      });
      queryClient.refetchQueries({
        queryKey: [CacheKey.UserProfile],
      });
    },
    onError: defaultErrorHandler,
  });
};
