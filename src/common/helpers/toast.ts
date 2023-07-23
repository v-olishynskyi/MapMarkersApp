import Toast, { ToastShowParams } from 'react-native-toast-message';

export const showToast = (
  type: 'success' | 'error' | 'info',
  message: string,
  title?: string,
  ...rest: Omit<ToastShowParams, 'type' | 'text1' | 'text2'>[]
) => {
  const toastTitle = title || `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
  const toastMessage = message || '';

  Toast.show({ type, text1: toastTitle, text2: toastMessage, ...rest });
};
