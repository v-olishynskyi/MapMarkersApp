import { StyleSheet } from 'react-native';
import { getTheme } from '@utils/helpers';
import { spacingBase } from '@styles';

const useStyles = (error: boolean) => {
  const { colors } = getTheme();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacingBase.s3,
      borderWidth: 1,
      borderColor: error ? colors.error : '#6B737A',
      borderRadius: 4,
      marginBottom: 4,
    },
    pv2: { paddingVertical: spacingBase.s2 },
    pv3: { paddingVertical: spacingBase.s3 },
    input: {
      height: '100%',
      flex: 1,
    },
    iconContainer: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    leftIcon: {
      marginRight: spacingBase.s1,
    },
    rightIcon: {
      marginLeft: spacingBase.s1,
    },
    error: {
      color: colors.error,
      fontSize: 12,
      textAlign: 'left',
      paddingHorizontal: spacingBase.s3,
    },
  });
};

export default useStyles;
