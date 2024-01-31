import { showToast } from '@common/helpers';
import { LoginData, LoginResponse } from '@services/auth';
import AuthService from '@services/auth';
import { useStores } from '@store';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import * as Keychain from 'react-native-keychain';

export const useLogin = () => {
  const {
    authStore: { setIsAuth, setSessionId },
  } = useStores();

  return useMutation<LoginResponse, AxiosError, LoginData>({
    mutationFn: data => AuthService.login(data),
    onSuccess: async ({ access_token, refresh_token, session_id }) => {
      await Keychain.setGenericPassword(
        'acs_tkn',
        JSON.stringify({ accessToken: access_token }),
      );

      setIsAuth(true);
      setSessionId(session_id);

      Keychain.setInternetCredentials(
        'refresh_tkn',
        'rfsh_tkn',
        JSON.stringify({ refreshToken: refresh_token }),
      );

      Keychain.setInternetCredentials(
        'session_id',
        'session_id',
        JSON.stringify({ sessionId: session_id }),
      );
    },
    onError: (error: any) => {
      const parsedError = error.message || error;
      const errorMessage = __DEV__ ? `useLogin: ${parsedError}` : parsedError;

      showToast('error', errorMessage);
    },
  });
};
