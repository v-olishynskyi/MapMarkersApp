import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  const { typography, colors } = getTheme();

  return StyleSheet.create({
    footerContainer: {
      justifyContent: 'center',
    },
    loader: {
      paddingVertical: spacingBase.s5,
    },
    emptyComponentLabel: {
      ...typography.regular.title2,
      padding: spacingBase.s4,
      color: colors.gray2,
      textAlign: 'center',
    },
  });
};

export default useStyles;
