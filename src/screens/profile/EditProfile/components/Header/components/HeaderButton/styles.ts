import { StyleSheet } from 'react-native';
import { getTheme } from '@utils/helpers';
import { spacingBase } from '@styles';

const useStyles = () => {
  const { typography } = getTheme();

  return StyleSheet.create({
    activityIndicator: {
      marginRight: spacingBase.s1,
    },
    label: {
      ...typography.regular.body,
    },
  });
};

export default useStyles;
