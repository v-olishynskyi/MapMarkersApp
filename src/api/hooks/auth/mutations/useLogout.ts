import { defaultErrorHandler } from '@common/helpers';
import AuthService from '@services/auth';
import { useStores } from '@store';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useLogout = () => {
  const {
    authStore: { logout },
  } = useStores();

  return useMutation<void, AxiosError, string>({
    mutationFn: AuthService.logout,
    onSuccess: logout,
    onError: defaultErrorHandler,
  });
};
