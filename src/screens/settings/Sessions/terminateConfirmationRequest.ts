import { IS_IOS } from '@common/helpers';
import { ActionSheetIOS, Alert } from 'react-native';

const terminateConfirmationRequest = (terminateCallback: VoidFunction) => {
  if (IS_IOS) {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Скасувати', 'Завершити сеанс'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        message: 'Ви дійсно хочете завершити сеанс на данному пристрої?',
      },
      index => {
        if (index === 0) {
          return;
        }

        terminateCallback();
      },
    );
  } else {
    Alert.alert(
      'Ви дійсно хочете завершити сеанс на данному пристрої?',
      undefined,
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Завершити сеанс',
          style: 'destructive',
          onPress: terminateCallback,
        },
      ],
    );
  }
};

export default terminateConfirmationRequest;
