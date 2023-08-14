import { StyleSheet } from 'react-native';
import { spacingBase } from '@styles';
import { IconSize } from './types';
import { getTheme } from '@common/helpers';

const useStyles = (size: IconSize) => {
  const { colors } = getTheme();

  return StyleSheet.create({
    container: {
      borderRadius: size === 'small' ? spacingBase.s1 / 2 : spacingBase.s1,
      padding: 4,
      alignSelf: 'center',
      backgroundColor: colors.blue,
      marginBottom: spacingBase.s2,
    },
  });
};

export default useStyles;
