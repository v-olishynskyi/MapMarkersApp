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

export const useLeaveGroup = (groupId: string) => {
  const {
    userStore: { user },
  } = useStores();

  const mutationKey = [MutationKey.LeaveGroup, groupId];
  const queryClient = useQueryClient();

  return useMutation<MessageResponse, AxiosError, JoinLeaveGroupParams>({
    mutationKey,
    mutationFn: GroupsService.leave,
    onError: defaultErrorHandler,
    onSuccess: ({ message }, { group_id, user_id }) => {
      showToast('success', message);

      queryClient.refetchQueries({
        exact: false,
        queryKey: [CacheKey.UserProfile],
      });

      queryClient.refetchQueries({
        exact: false,
        queryKey: [CacheKey.AllGroups],
      });

      queryClient.setQueryData<Group>(
        [CacheKey.Group, groupId],
        (oldGroupData): any => ({
          ...oldGroupData,
          members: oldGroupData?.members.filter(({ id }) => id !== user_id),
        }),
      );

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
                      is_member: false,
                      members: group.members.filter(
                        groupUser => groupUser.id !== user.id,
                      ),
                    }
                  : group,
              ),
            })),
          } as any;
        },
      );

      const hasLoadedGroup =
        queryClient.getQueriesData({
          queryKey: [CacheKey.Group, group_id],
          exact: true,
        }).length > 0;

      hasLoadedGroup &&
        queryClient.setQueryData<Group>(
          [CacheKey.Group, group_id],
          (oldGroupData): any => ({
            ...oldGroupData,
            members: oldGroupData!.members.filter(({ id }) => id !== user_id),
            is_member: false,
          }),
        );
    },
  });
};
