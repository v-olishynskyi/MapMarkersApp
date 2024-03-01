import { CacheKey } from '@api/CacheKey';
import { MutationKey } from '@api/MutationKey';
import { defaultErrorHandler } from '@common/helpers';
import { MessageResponse } from '@common/types';
import MarkersService from '@services/markers';
import { useStores } from '@store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeleteMarker = () => {
  const mutationKey = [MutationKey.DeleteMarker];

  const {
    markersStore: { clearEditableMarker, clearActiveMarker },
  } = useStores();
  const queryClient = useQueryClient();

  return useMutation<MessageResponse, AxiosError, string>({
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

      const hasFetchedMarkersByUser =
        queryClient.getQueriesData({
          queryKey: [CacheKey.MarkersByUser],
          exact: false,
        }).length > 0;

      if (hasFetchedMarkersByUser) {
        queryClient.refetchQueries({
          queryKey: [CacheKey.MarkersByUser],
          exact: false,
        });
      }
    },
    onError: defaultErrorHandler,
  });
};
