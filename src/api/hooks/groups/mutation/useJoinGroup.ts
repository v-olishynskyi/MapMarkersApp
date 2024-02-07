import { CacheKey } from '@api/CacheKey';
import { MutationKey } from '@api/MutationKey';
import { defaultErrorHandler, wait } from '@common/helpers';
import { MessageResponse, PaginationResponse } from '@common/types';
import { Group } from '@common/types/entities';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useJoinGroup = () => {
  const mutationKey = [MutationKey.JoinGroup];

  const queryClient = useQueryClient();

  return useMutation<MessageResponse, AxiosError, string>({
    mutationKey,
    mutationFn: async (id: string) => {
      await wait(2000);
      return Promise.resolve(true);
    },
    onError: (error, group_id) => {
      defaultErrorHandler(error);
    },
    onSuccess: (_, group_id) => {
      queryClient.setQueriesData<InfiniteData<PaginationResponse<Group>>>(
        {
          queryKey: [CacheKey.Groups],
          exact: false,
        },
        pages => {
          return {
            ...pages,
            pages: pages?.pages.map(page => ({
              ...page,
              data: page.data.map(group =>
                group.id === group_id ? { ...group, is_member: true } : group,
              ),
            })),
          };
        },
      );
    },
  });
};
