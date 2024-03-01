import { CacheKey } from '@api/CacheKey';
import { MutationKey } from '@api/MutationKey';
import { defaultErrorHandler } from '@common/helpers';
import { Marker } from '@common/types/entities';
import MarkersService, { UpdateMarkerData } from '@services/markers';
import { useStores } from '@store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUpdateMarker = (id: string) => {
  const {
    markersStore: { setActiveMarker },
  } = useStores();
  const mutationKey = [MutationKey.UpdateMarker];

  const queryClient = useQueryClient();

  return useMutation<Marker, AxiosError, UpdateMarkerData>({
    mutationKey,
    mutationFn: data => MarkersService.update(id, data),
    onSuccess: updatedMarker => {
      queryClient.refetchQueries({
        queryKey: [CacheKey.Markers],
        exact: false,
      });
      queryClient.refetchQueries({
        queryKey: [CacheKey.UserProfile],
      });
      setActiveMarker(updatedMarker);

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
