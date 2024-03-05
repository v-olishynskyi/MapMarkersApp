import { ColorValue, StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';

const useStyles = (loading: boolean, color?: ColorValue) => {
  const { typography, colors } = getTheme();

  return StyleSheet.create({
    label: {
      ...typography.regular.body,
      color: loading ? colors.gray : color || colors.primary,
    },
    loader: { marginRight: spacingBase.s1 },
  });
};

export default useStyles;
