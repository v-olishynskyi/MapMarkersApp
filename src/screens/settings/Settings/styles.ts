import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  const { colors } = getTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      padding: spacingBase.s3,
    },
    blockContainer: {
      backgroundColor: colors.white,
      paddingVertical: spacingBase.s1,
    },
  });
};

export default useStyles;
