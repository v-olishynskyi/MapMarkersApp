import { spacingBase } from '@styles';
import { getTheme } from '@utils/helpers';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  const { colors, typography } = getTheme();

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      paddingTop: spacingBase.s3,
      backgroundColor: colors.card,
    },
    fullname: { ...typography.bold.title3 },
    email: { ...typography.regular.subhead },
    divider: {
      height: spacingBase.s2,
      backgroundColor: colors.background,
    },
    userContainer: {
      flexDirection: 'row',
      paddingBottom: spacingBase.s4,
      paddingHorizontal: spacingBase.s4,
    },
    userInfo: {
      flex: 1,
      justifyContent: 'space-around',
    },
    block: {
      paddingTop: spacingBase.s1,
      backgroundColor: colors.card,
      paddingHorizontal: spacingBase.s4,
    },
    pressable: {
      borderBottomColor: colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacingBase.s3,
    },
    pressableText: { ...typography.regular.callout, color: colors.text },
    icon: { marginRight: spacingBase.s3 },
    row: { flexDirection: 'row', alignItems: 'center' },
  });
};

export default useStyles;
