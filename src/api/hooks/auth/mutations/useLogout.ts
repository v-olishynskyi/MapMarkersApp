import { defaultErrorHandler } from '@common/helpers';
import AuthService from '@services/auth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import * as Keychain from 'react-native-keychain';

export const useLogout = () => {
  return useMutation<void, AxiosError, string>({
    mutationFn: AuthService.logout,
    onSuccess: async () => {
      await Keychain.resetGenericPassword();
      await Keychain.resetInternetCredentials('refresh_tkn');
      await Keychain.resetInternetCredentials('session_id');
    },
    onError: defaultErrorHandler,
  });
};
