import { CacheKey } from '@api/CacheKey';
import { MutationKey } from '@api/MutationKey';
import { defaultErrorHandler } from '@common/helpers';
import MarkersService from '@services/markers';
import { useStores } from '@store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeleteMarker = () => {
  const mutationKey = [MutationKey.DeleteMarker];

  const {
    markersStore: { clearEditableMarker },
    mapStore: { clearActiveMarker },
  } = useStores();
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, AxiosError, string>({
    mutationKey,
    mutationFn: MarkersService.delete,
    onSuccess: () => {
      clearEditableMarker();
      clearActiveMarker();
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
