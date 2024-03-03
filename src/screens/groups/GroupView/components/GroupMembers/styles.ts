import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';

const useStyles = () => {
  const { typography, colors } = getTheme();

  return StyleSheet.create({
    container: {
      justifyContent: 'space-evenly',
    },
    count: {
      ...typography.regular.body,
      color: colors.gray,
    },
  });
};

export default useStyles;
