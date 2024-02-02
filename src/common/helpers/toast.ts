import Toast, { ToastShowParams } from 'react-native-toast-message';

const TypeTitleEnum = {
  success: 'Успішно',
  error: 'Помилка',
  info: 'Увага',
};

export const showToast = (
  type: 'success' | 'error' | 'info',
  message: string,
  title?: string,
  ...rest: Omit<ToastShowParams, 'type' | 'text1' | 'text2'>[]
) => {
  const toastTitle = title || TypeTitleEnum[type];
  const toastMessage = message || '';

  Toast.show({ type, text1: toastTitle, text2: toastMessage, ...rest });
};
