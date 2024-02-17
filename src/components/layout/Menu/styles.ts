import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  const { colors, typography } = getTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: spacingBase.s1,
      overflow: 'hidden',
    },
    headerText: {
      ...typography.regular.footnote,
      color: colors.gray,
      textTransform: 'uppercase',
      marginBottom: spacingBase.s1,
      marginLeft: spacingBase.s3,
    },
    footerText: {
      ...typography.regular.caption1,
      color: colors.gray,
      marginTop: spacingBase.s1,
      marginLeft: spacingBase.s3,
    },
  });
};

export default useStyles;
