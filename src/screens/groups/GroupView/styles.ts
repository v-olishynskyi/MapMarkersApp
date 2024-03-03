import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  const { typography, colors } = getTheme();

  return StyleSheet.create({
    scrollViewContainer: {
      flex: 1,
    },
    scrollViewContent: {
      flex: 1,
      paddingTop: spacingBase.s4,
      paddingHorizontal: spacingBase.s3,
    },

    image: {
      width: 100,
      height: 100,
      borderRadius: 100,
      marginBottom: spacingBase.s2,
      overflow: 'hidden',
      alignSelf: 'center',
    },
    groupPrivacyType: {
      ...typography.regular.subhead,
      color: colors.gray2,
      alignSelf: 'center',
      marginBottom: spacingBase.s4,
    },
  });
};

export default useStyles;
