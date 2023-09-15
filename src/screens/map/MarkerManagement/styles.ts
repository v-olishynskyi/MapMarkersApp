import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { generalStyles, spacingBase } from '@styles';

const useStyles = () => {
  const { colors, typography } = getTheme();

  return StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      paddingVertical: spacingBase.s2,
      paddingHorizontal: spacingBase.s3,
      gap: spacingBase.s3,
    },
    title: {
      ...typography.regular.title3,
      color: colors.text,
      flex: 1,
      textAlign: 'center',
    },
    body: {
      gap: 10,
    },
    actions: {
      ...generalStyles.rowBetween,
    },
    button: { flex: 1 },
    mr1: { marginRight: spacingBase.s1 },

    descriptionInput: {
      maxHeight: 200,
    },
    iconContainer: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default useStyles;
