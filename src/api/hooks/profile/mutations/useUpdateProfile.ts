import { MutationKey } from '@api/MutationKey';
import { showToast } from '@common/helpers';
import { User } from '@common/types/entities';
import { UpdateProfileData } from '@services/profile';
import ProfileService from '@services/profile';
import { useStores } from '@store';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUpdateProfile = () => {
  const mutationKey = [MutationKey.UpdateProfile];
  const {
    userStore: { setUser, user },
  } = useStores();

  return useMutation<User, AxiosError, UpdateProfileData>({
    mutationKey,
    mutationFn: data => ProfileService.updateProfile(data),
    onMutate: data => {
      setUser({ ...user });
    },
    onSuccess: user => {
      return setUser(user);
    },
    onError: (error: any) => {
      const parsedError = error.message || error;
      const errorMessage = __DEV__
        ? `useUpdateProfile: ${parsedError}`
        : parsedError;

      showToast('error', errorMessage);
    },
  });
};
