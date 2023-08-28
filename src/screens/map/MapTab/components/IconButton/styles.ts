import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';

const useStyles = () => {
  const { colors } = getTheme();

  return StyleSheet.create({
    container: {
      borderRadius: 100,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      width: spacingBase.s6,
      height: spacingBase.s6,
    },
  });
};

export default useStyles;
