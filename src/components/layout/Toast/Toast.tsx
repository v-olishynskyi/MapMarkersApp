import React, { FC } from 'react';
import LibToast, {
  ToastConfig,
  SuccessToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';

type Props = {};

const Toast: FC<Props> = () => {
  const toastConfig: ToastConfig = {
    success: props => <SuccessToast {...props} />,
    error: props => <ErrorToast {...props} />,
    info: props => <InfoToast {...props} />,
  };

  return <LibToast config={toastConfig} />;
};

export default Toast;