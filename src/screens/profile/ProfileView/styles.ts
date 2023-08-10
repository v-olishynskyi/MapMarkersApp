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
      justifyContent: 'space-between',
    },
    profileContainer: {},
    avatar_container: {
      alignItems: 'center',
      marginBottom: spacingBase.s4,
    },

    fullname: {
      ...typography.bold.body,
      textAlign: 'center',
      marginBottom: 4,
    },
    email: {
      ...typography.regular.body,
      color: colors.gray,
      textAlign: 'center',
    },
  });
};

export default useStyles;
