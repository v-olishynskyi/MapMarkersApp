import React from 'react';
import LibToast, {
  ToastConfig,
  SuccessToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';

type Props = {};

const Toast: React.FC<Props> = () => {
  const toastConfig: ToastConfig = {
    success: props => <SuccessToast {...props} />,
    error: props => <ErrorToast {...props} />,
    info: props => <InfoToast {...props} />,
  };

  return <LibToast config={toastConfig} visibilityTime={3000} />;
};

export default Toast;
