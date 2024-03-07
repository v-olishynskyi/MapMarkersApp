import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';

const useStyles = () => {
  const { typography, colors } = getTheme();

  return StyleSheet.create({
    radioButtonContainer: {
      justifyContent: 'space-between',
    },
    radioButtonLabel: {
      ...typography.regular.subhead,
      color: colors.text,
    },
  });
};

export default useStyles;
