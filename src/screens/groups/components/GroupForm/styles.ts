import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';

const useStyles = () => {
  const {} = getTheme();

  return StyleSheet.create({
    avatar: {
      alignSelf: 'center',
      marginBottom: spacingBase.s4,
    },
    input: {
      marginBottom: spacingBase.s2,
    },
    mb4: {
      marginBottom: spacingBase.s4,
    },
  });
};

export default useStyles;
