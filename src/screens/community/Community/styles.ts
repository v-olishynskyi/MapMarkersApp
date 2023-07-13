import { spacingBase } from '@styles';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: { paddingHorizontal: spacingBase.s3 },
  });
};

export default useStyles;
