import { MutationKey } from '@api/MutationKey';
import { defaultErrorHandler, showToast } from '@common/helpers';
import { MessageResponse } from '@common/types';
import FilesService from '@services/files';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeleteFile = (type: string) => {
  const mutationKey = [MutationKey.DeleteFile];

  return useMutation<MessageResponse, AxiosError, string>({
    mutationKey,
    mutationFn: id => FilesService.delete(id),
    onError: defaultErrorHandler,
    onSuccess: () => showToast('success', `${type} успішно видалено`),
  });
};
