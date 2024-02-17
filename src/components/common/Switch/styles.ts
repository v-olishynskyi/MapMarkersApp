import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';

const useStyles = () => {
  const { typography, colors } = getTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    label: {
      ...typography.regular.body,
      color: colors.text,
    },
  });
};

export default useStyles;
