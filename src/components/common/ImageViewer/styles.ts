import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';

const useStyles = () => {
  const { colors } = getTheme();

  return StyleSheet.create({
    carousel: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageCounter: {
      color: colors.text,
    },
  });
};

export default useStyles;
