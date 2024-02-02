import { MutationKey } from '@api/MutationKey';
import { defaultErrorHandler } from '@common/helpers';
import AuthService from '@services/auth/auth.service';
import { useStores } from '@store';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useTerminateSession = () => {
  const mutationKey = [MutationKey.TerminateSession];

  const {
    userStore: {
      setSessions,
      user: { sessions },
    },
  } = useStores();

  return useMutation<unknown, AxiosError, string>({
    mutationKey,
    mutationFn: AuthService.logout,
    onError: defaultErrorHandler,
    onMutate: sessionId => {
      setSessions(sessions.items.filter(item => item.id !== sessionId));
    },
  });
};
