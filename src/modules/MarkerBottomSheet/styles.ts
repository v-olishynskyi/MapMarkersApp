import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { generalStyles, spacingBase } from '@styles';

const useStyles = () => {
  const { colors, typography } = getTheme();

  return StyleSheet.create({
    contentContainer: {
      paddingTop: spacingBase.s1,
      paddingHorizontal: spacingBase.s3,
      justifyContent: 'space-between',
    },
    background: {
      backgroundColor: colors.background,
    },
    handleIndicator: {
      backgroundColor: colors.gray,
    },

    errorLabel: {
      ...typography.regular.body,
      color: colors.text,
      marginBottom: spacingBase.s3,
    },
    header: {
      ...generalStyles.rowBetween,
      paddingHorizontal: spacingBase.s3,
      marginBottom: spacingBase.s2,
    },
    headerActions: {
      ...generalStyles.row,
      gap: spacingBase.s1,
    },

    name: {
      ...typography.regular.title3,
      color: colors.text,
    },
    description: {
      ...typography.regular.body,
      color: colors.gray,
    },
  });
};

export default useStyles;
