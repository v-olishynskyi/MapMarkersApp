import { MutationKey } from '@api/MutationKey';
import { defaultErrorHandler, showToast } from '@common/helpers';
import { User } from '@common/types/entities';
import ProfileService from '@services/profile';
import { useStores } from '@store';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeleteAvatar = () => {
  const mutationKey = [MutationKey.DeleteAvatar];

  const {
    userStore: { setAvatar },
  } = useStores();

  return useMutation<User, AxiosError, void>({
    mutationKey,
    mutationFn: ProfileService.deleteAvatar,
    onSuccess: () => {
      showToast('success', 'Аватар успішно видалено');
      setAvatar(null);
    },
    onError: defaultErrorHandler,
  });
};
