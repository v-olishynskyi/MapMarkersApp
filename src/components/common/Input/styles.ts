import { StyleSheet } from 'react-native';
import { IS_ANDROID, getTheme } from '@common/helpers';
import { spacingBase } from '@styles';

const useStyles = (error: boolean, focused: boolean) => {
  const { colors, typography } = getTheme();

  return StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: focused
        ? colors.primary
        : error
        ? colors.red
        : colors.border,
      borderRadius: 4,
    },
    caption: {
      marginBottom: spacingBase.s2,
      ...typography.regular.headline,
      color: colors.gray,
    },
    leftIcon: {
      paddingLeft: spacingBase.s1,
    },
    rightIcon: {
      paddingRight: spacingBase.s3,
    },
    input: {
      height: '100%',
      flex: 1,
      ...typography.regular.body,
      color: colors.text,
      paddingHorizontal: spacingBase.s1,
      paddingVertical: spacingBase.s2,
      ...(IS_ANDROID
        ? {
            paddingVertical: 8,
          }
        : {}),
    },
    iconContainer: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    error: {
      ...typography.regular.caption2,
      color: colors.red,
    },
  });
};

export default useStyles;
