import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { generalStyles, spacingBase } from '@styles';

const useStyles = () => {
  const { colors, typography } = getTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: spacingBase.s1,
      paddingVertical: spacingBase.s2,
      gap: spacingBase.s3,
    },
    header: {
      ...generalStyles.row,
      paddingHorizontal: spacingBase.s2,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      justifyContent: 'space-between',
      paddingBottom: spacingBase.s1,
    },
    title: {
      ...typography.regular.title3,
      color: colors.text,
      flex: 1,
      textAlign: 'center',
    },
    body: {
      paddingHorizontal: spacingBase.s2,
      gap: 10,
    },
    actions: {
      ...generalStyles.rowBetween,
      paddingHorizontal: spacingBase.s2,
    },
    button: { flex: 1 },
    mr1: { marginRight: spacingBase.s1 },
  });
};

export default useStyles;
