import { MutationKey } from '@api/MutationKey';
import { defaultErrorHandler, showToast } from '@common/helpers';
import { User } from '@common/types/entities';
import ProfileService from '@services/profile';
import { useStores } from '@store';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useChangeAvatar = () => {
  const mutationKey = [MutationKey.ChangeAvatar];

  const {
    userStore: { setUser },
  } = useStores();

  return useMutation<User, AxiosError, FormData>({
    mutationKey,
    mutationFn: ProfileService.uploadAvatar,
    onSuccess: user => {
      showToast('success', 'Аватар успішно змінено');
      setUser(user);
    },
    onError: defaultErrorHandler,
  });
};
