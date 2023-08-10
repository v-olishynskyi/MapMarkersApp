import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  const { colors } = getTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: spacingBase.s1,
      overflow: 'hidden',
    },
  });
};

export default useStyles;
