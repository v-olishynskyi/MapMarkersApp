import { StyleSheet } from 'react-native';
import { spacingBase } from '@styles';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: spacingBase.s3,
      marginBottom: spacingBase.s1,
      width: '100%',
    },
    content: { justifyContent: 'space-between', flex: 1 },
    avatar: { marginRight: spacingBase.s2 },
  });
};

export default useStyles;
