import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';

const useStyles = () => {
  const { typography, colors } = getTheme();

  return StyleSheet.create({
    title: {
      ...typography.bold.title3,
      color: colors.text,
      marginBottom: spacingBase.s1,
    },
  });
};

export default useStyles;
