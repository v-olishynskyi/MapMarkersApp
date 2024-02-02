import { CacheKey } from '@api/CacheKey';
import { MutationKey } from '@api/MutationKey';
import { defaultErrorHandler } from '@common/helpers';
import { Marker } from '@common/types/entities';
import { CreateMarkerData } from '@services/markers';
import MarkersService from '@services/markers/markers.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCreateMarker = () => {
  const mutationKey = [MutationKey.CreateMarker];

  const queryClient = useQueryClient();

  return useMutation<Marker, AxiosError, CreateMarkerData>({
    mutationKey,
    mutationFn: MarkersService.create,
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
