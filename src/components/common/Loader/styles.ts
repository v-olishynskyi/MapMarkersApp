import { spacingBase } from '@styles';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    loader: {
      paddingHorizontal: spacingBase.s5,
      paddingVertical: spacingBase.s5,
    },
  });
};

export default useStyles;
