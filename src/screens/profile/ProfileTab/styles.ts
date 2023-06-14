import { spacingBase } from '@styles';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      paddingTop: spacingBase.s3,
      paddingHorizontal: spacingBase.s4,
    },
  });
};

export default useStyles;
