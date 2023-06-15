import { spacingBase } from '@styles';
import { getTheme } from '@utils/helpers';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  const { colors } = getTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      flex: 1,
      paddingTop: spacingBase.s3,
      paddingBottom: spacingBase.s4,
      paddingHorizontal: spacingBase.s4,
      justifyContent: 'space-between',
    },
    profileContainer: {},
    avatar_container: {
      alignItems: 'center',
    },
  });
};

export default useStyles;
