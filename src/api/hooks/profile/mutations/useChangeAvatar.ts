import { MutationKey } from '@api/MutationKey';
import { defaultErrorHandler } from '@common/helpers';
import { useMutation } from '@tanstack/react-query';

export const useChangeAvatar = () => {
  const mutationKey = [MutationKey.ChangeAvatar];

  return useMutation({
    mutationKey,
    mutationFn: () => {},
    onSuccess: () => {},
    onError: defaultErrorHandler,
  });
};
