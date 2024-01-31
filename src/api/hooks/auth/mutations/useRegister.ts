import { defaultErrorHandler } from '@common/helpers';
import { RegistrationData } from '@services/auth';
import AuthService from '@services/auth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useRegister = () => {
  return useMutation<void, AxiosError, RegistrationData>({
    mutationFn: data => AuthService.registration(data),
    onError: defaultErrorHandler,
  });
};
