import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';

const useStyles = () => {
  const { colors } = getTheme();

  return StyleSheet.create({
    background: {
      backgroundColor: colors.card,
    },
    handleIndicator: {
      backgroundColor: colors.gray,
    },
  });
};

export default useStyles;
