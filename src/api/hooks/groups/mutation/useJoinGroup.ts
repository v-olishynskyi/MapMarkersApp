import { CacheKey } from '@api/CacheKey';
import { MutationKey } from '@api/MutationKey';
import { defaultErrorHandler, showToast } from '@common/helpers';
import { MessageResponse, PaginationResponse } from '@common/types';
import { Group } from '@common/types/entities';
import GroupsService, { JoinLeaveGroupParams } from '@services/groups';
import { useStores } from '@store';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useJoinGroup = (groupId: string) => {
  const {
    userStore: { userEntity },
  } = useStores();

  const mutationKey = [MutationKey.JoinGroup, groupId];

  const queryClient = useQueryClient();

  return useMutation<MessageResponse, AxiosError, JoinLeaveGroupParams>({
    mutationKey,
    mutationFn: GroupsService.join,
    onError: defaultErrorHandler,
    onSuccess: ({ message }, { group_id }) => {
      showToast('success', message, null);

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
                group.id === group_id
                  ? {
                      ...group,
                      is_member: true,
                      members: [...group.members, userEntity],
                    }
                  : group,
              ),
            })),
          } as any;
        },
      );
    },
  });
};
