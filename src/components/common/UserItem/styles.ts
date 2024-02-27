import { StyleSheet } from 'react-native';
import { spacingBase } from '@styles';
import { getTheme } from '@common/helpers';

const useStyles = (size: 'small' | 'normal') => {
  const { typography, colors } = getTheme();

  const isSmall = size === 'small';

  return StyleSheet.create({
    container: {},
    avatar: { marginRight: isSmall ? spacingBase.s1 : spacingBase.s2 },
    fullname: {
      ...(isSmall ? typography.regular.subhead : typography.regular.body),
      color: colors.text,
    },
    email: {
      ...typography.regular.footnote,
      color: colors.gray,
    },
  });
};

export default useStyles;
