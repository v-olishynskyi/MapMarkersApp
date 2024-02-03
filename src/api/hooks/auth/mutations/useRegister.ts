import { defaultErrorHandler, showToast } from '@common/helpers';
import { RegistrationData, RegistrationResponse } from '@services/auth';
import AuthService from '@services/auth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useRegister = () => {
  return useMutation<RegistrationResponse, AxiosError, RegistrationData>({
    mutationFn: data => AuthService.registration(data),
    onError: defaultErrorHandler,
    onSuccess: data => {
      showToast('success', data.message);
    },
  });
};
