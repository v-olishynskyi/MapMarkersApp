import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  const {} = getTheme();

  return StyleSheet.create({
    container: {
      paddingHorizontal: spacingBase.s3,
      paddingVertical: spacingBase.s4,
    },
  });
};

export default useStyles;
