import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacingBase } from '@styles';

const useStyles = () => {
  const { colors } = getTheme();
  const { top } = useSafeAreaInsets();

  return StyleSheet.create({
    carousel: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerContainer: {
      position: 'absolute',
      top: top + spacingBase.s4,
      right: spacingBase.s2,
      flexDirection: 'row',
      width: '100%',
      zIndex: 1,
      alignItems: 'center',
    },
    iconContainer: {
      backgroundColor: 'transparent',
      width: 40,
      height: 40,
    },
    imageContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageCounter: {
      color: colors.text,
    },
  });
};

export default useStyles;
