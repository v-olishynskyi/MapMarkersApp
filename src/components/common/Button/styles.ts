import { spacingBase } from '@styles';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loader: { marginRight: spacingBase.s1 },
  });
};

export default useStyles;
