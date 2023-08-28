import { spacingBase } from '@styles';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useStyles = () => {
  const { bottom } = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
    },

    myLocationButton: {
      position: 'absolute',
      right: spacingBase.s2,
      bottom: bottom,
    },
    minusButton: {
      position: 'absolute',
      right: spacingBase.s2,
      bottom: bottom + 80,
    },
    plusButton: {
      position: 'absolute',
      right: spacingBase.s2,
      bottom: bottom + 140,
    },
  });
};

export default useStyles;
