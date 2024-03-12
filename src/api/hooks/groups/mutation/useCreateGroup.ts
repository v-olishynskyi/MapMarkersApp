import { CacheKey } from '@api/CacheKey';
import { MutationKey } from '@api/MutationKey';
import { defaultErrorHandler, showToast } from '@common/helpers';
import { CreateGroupParams, CreateGroupResponse } from '@services/groups';
import GroupsService from '@services/groups';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  const mutationKey = [MutationKey.CreateGroup];

  return useMutation<CreateGroupResponse, AxiosError, CreateGroupParams>({
    mutationKey,
    mutationFn: GroupsService.create,
    onSuccess: ({ message }) => {
      showToast('success', message);

      queryClient.refetchQueries({
        exact: false,
        queryKey: [CacheKey.UserProfile],
      });

      queryClient.refetchQueries({
        exact: false,
        queryKey: [CacheKey.AllGroups],
      });
    },
    onError: defaultErrorHandler,
  });
};
