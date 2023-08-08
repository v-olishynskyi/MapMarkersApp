import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  const { colors, typography } = getTheme();

  return StyleSheet.create({
    container: { paddingVertical: spacingBase.s1 },
    iconContainer: {
      borderRadius: 4,
      padding: 4,
      marginRight: spacingBase.s2,
      alignSelf: 'flex-start',
      backgroundColor: colors.green,
    },
    icon: {},
    info: {
      flex: 1,
      paddingBottom: spacingBase.s2,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    device: {
      flex: 1,
      ...typography.bold.footnote,
    },
    version: {
      flex: 1,
      ...typography.bold.caption1,
    },
    location: {
      flex: 1,
      ...typography.regular.caption2,
    },
    minusIconContainer: {
      overflow: 'hidden',
      borderRadius: 50,
      marginRight: spacingBase.s3,
    },
    minusIcon: {
      backgroundColor: colors.red,
    },

    rightActionsContainer: {
      width: 128,
      flexDirection: 'row',
      paddingVertical: spacingBase.s1,
    },
    actionButtonContainer: { flex: 1 },
    rectButton: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.red,
    },
    actionText: {
      ...typography.regular.body,
      color: colors.white,
      backgroundColor: 'transparent',
      marginLeft: spacingBase.s1,
    },
  });
};

export default useStyles;
