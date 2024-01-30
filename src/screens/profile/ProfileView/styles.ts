import { spacingBase } from '@styles';
import { getTheme } from '@common/helpers';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  const { colors, typography } = getTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      flex: 1,
      paddingTop: spacingBase.s3,
      paddingBottom: spacingBase.s4,
      paddingHorizontal: spacingBase.s3,
    },
    profileContainer: {},
    avatarContainer: {
      alignItems: 'center',
      marginBottom: spacingBase.s4,
    },

    label: {
      ...typography.regular.body,
      color: colors.gray,
    },

    fullname: {
      ...typography.bold.body,
      textAlign: 'center',
      color: colors.text,
      marginBottom: 4,
    },
    addUsernameButton: {
      ...typography.regular.body,
      color: colors.primary,
    },

    markers: {
      marginTop: spacingBase.s4,
    },
  });
};

export default useStyles;
