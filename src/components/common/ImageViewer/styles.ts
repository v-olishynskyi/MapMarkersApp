import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacingBase } from '@styles';

const useStyles = () => {
  const {} = getTheme();
  const { top } = useSafeAreaInsets();

  return StyleSheet.create({
    carousel: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerContainer: {
      position: 'absolute',
      top: top + spacingBase.s4,
      right: spacingBase.s2,
      flexDirection: 'row-reverse',
      width: '100%',
      zIndex: 1,
    },
    iconContainer: {
      backgroundColor: 'transparent',
      width: 40,
      height: 40,
    },
  });
};

export default useStyles;
