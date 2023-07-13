import { StyleSheet } from 'react-native';
import { spacingBase } from '@styles';

const useStyles = () => {
  return StyleSheet.create({
    container: { marginBottom: spacingBase.s3 },
    avatar: { marginRight: spacingBase.s2 },
  });
};

export default useStyles;
