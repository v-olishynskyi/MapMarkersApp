import { MutationKey } from '@api/MutationKey';
import { defaultErrorHandler } from '@common/helpers';
import { MessageResponse } from '@common/types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useLeaveGroup = () => {
  const mutationKey = [MutationKey.LeaveGroup];

  return useMutation<MessageResponse, AxiosError, string>({
    mutationKey,
    mutationFn: (id: string) => Promise.resolve(true),
    onError: (error, group_id) => {
      defaultErrorHandler(error);
    },
    onSuccess: group_id => {
      // queryClient.setQueryData([CacheKey.Groups], data => {
      //   console.log(JSON.stringify(data, null, 2));
      // });
    },
  });
};
