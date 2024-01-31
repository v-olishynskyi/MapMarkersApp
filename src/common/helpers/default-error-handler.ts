import { showToast } from '@common/helpers/toast';
import { isTypeof } from '@common/helpers/type-chekers';

export const defaultErrorHandler = (error: any) => {
  const errorMessage = isTypeof(error, 'string') ? error : error.message;

  showToast('error', errorMessage);
};
