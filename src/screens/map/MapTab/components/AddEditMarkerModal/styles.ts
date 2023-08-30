import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { generalStyles, spacingBase } from '@styles';

const useStyles = () => {
  const { colors, typography } = getTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: spacingBase.s1,
      paddingBottom: spacingBase.s2,
      paddingTop: spacingBase.s1,
    },
    header: {
      ...generalStyles.row,
      paddingHorizontal: spacingBase.s2,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      justifyContent: 'space-between',
      paddingBottom: 4,
    },
    title: {
      ...typography.regular.title3,
      color: colors.text,
      flex: 1,
      textAlign: 'center',
    },
    body: {
      padding: spacingBase.s2,
      gap: 10,
      marginBottom: spacingBase.s2,
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
