import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { spacingBase } from '@styles';

const useStyles = () => {
  const {} = getTheme();

  return StyleSheet.create({
    container: {
      position: 'relative',
      alignItems: 'center',
    },
    imageContainer: {
      position: 'absolute',
      width: SCREEN_WIDTH * 0.7,
      height: SCREEN_WIDTH * 0.7,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: spacingBase.s2,
      overflow: 'hidden',
    },
  });
};

export default useStyles;
