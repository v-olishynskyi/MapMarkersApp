import { spacingBase } from '@styles';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    footerContainer: {
      justifyContent: 'center',
    },
    loader: {
      paddingVertical: spacingBase.s5,
    },
  });
};

export default useStyles;
