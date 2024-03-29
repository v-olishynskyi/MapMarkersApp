import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  const { colors, typography } = getTheme();

  return StyleSheet.create({
    contentContainer: {
      paddingHorizontal: spacingBase.s3,
      justifyContent: 'space-between',
    },
    closeButtonContainer: {
      marginRight: spacingBase.s3,
      alignSelf: 'flex-end',
      borderRadius: 50,
      backgroundColor: colors.gray5,
      padding: 4,
    },
    background: {
      backgroundColor: colors.background,
    },
    terminateSessionButton: {
      marginTop: spacingBase.s3,
    },
    handleIndicator: {
      backgroundColor: colors.gray,
    },

    deviceName: {
      ...typography.regular.title2,
      textAlign: 'center',
      marginBottom: spacingBase.s3,
    },
  });
};

export default useStyles;
