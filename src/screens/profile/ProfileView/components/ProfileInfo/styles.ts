import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';

const useStyles = () => {
  const { typography, colors } = getTheme();

  return StyleSheet.create({
    label: {
      ...typography.regular.body,
      color: colors.gray,
    },

    fullname: {
      ...typography.bold.body,
      textAlign: 'center',
      color: colors.text,
      marginBottom: 4,
    },
    addUsernameButton: {
      ...typography.regular.body,
      color: colors.primary,
    },
  });
};

export default useStyles;
