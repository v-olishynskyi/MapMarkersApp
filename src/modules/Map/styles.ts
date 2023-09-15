import { StyleSheet } from 'react-native';
import { spacingBase } from '@styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTheme } from '@common/helpers';

const useStyles = () => {
  const { colors } = getTheme();
  const { bottom } = useSafeAreaInsets();

  return StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    iconButton: {
      backgroundColor: colors.background,
      width: spacingBase.s6,
      height: spacingBase.s6,
    },
    myLocationButton: {
      position: 'absolute',
      right: spacingBase.s2,
      bottom: bottom,
      width: spacingBase.s6,
      height: spacingBase.s6,
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
