import { StyleSheet } from 'react-native';
import { getTheme } from '@utils/helpers';
import { spacingBase } from '@styles';

const useStyles = () => {
  const { typography } = getTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacingBase.s3,
    },
    appName: {
      ...typography.bold.headline,
    },
    description: {
      ...typography.regular.body,
    },
  });
};

export default useStyles;
