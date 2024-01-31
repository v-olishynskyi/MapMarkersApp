import { MutationKey } from '@api/MutationKey';
import { showToast } from '@common/helpers';
import { User } from '@common/types/entities';
import { UpdateProfileData } from '@services/users';
import UsersService from '@services/users';
import { useStores } from '@store';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUpdateProfile = (userId: string) => {
  const mutationKey = [MutationKey.UpdateProfile];
  const {
    userStore: { setUser },
  } = useStores();

  return useMutation<User, AxiosError, UpdateProfileData>({
    mutationKey,
    mutationFn: data => UsersService.update(userId, data),
    onSuccess: user => setUser(user),
    onError: (error: any) => {
      const parsedError = error.message || error;
      const errorMessage = __DEV__
        ? `useUpdateProfile: ${parsedError}`
        : parsedError;

      showToast('error', errorMessage);
    },
  });
};
