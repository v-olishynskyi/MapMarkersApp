import { MutationKey } from '@api/MutationKey';
import { defaultErrorHandler, showToast } from '@common/helpers';
import { PublicFile } from '@common/types/entities';
import FilesService from '@services/files';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useUploadFile = (type: string) => {
  const mutationKey = [MutationKey.UploadFile];

  return useMutation<PublicFile, AxiosError, FormData>({
    mutationKey,
    mutationFn: formData => FilesService.upload(formData),
    onError: defaultErrorHandler,
    onSuccess: () => {
      showToast('success', `${type} успішно завантажено`);
    },
  });
};
