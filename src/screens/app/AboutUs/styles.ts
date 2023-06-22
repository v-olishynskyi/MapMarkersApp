import { StyleSheet } from 'react-native';
import { getTheme } from '@utils/helpers';

const useStyles = () => {
  const { typography } = getTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
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
