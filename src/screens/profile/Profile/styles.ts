import { useStores } from '@store';
import { spacingBase } from '@styles';
import { IS_IOS, getTheme } from '@utils/helpers';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useStyles = () => {
  const {
    uiStore: { isPortrait },
  } = useStores();
  const { colors } = getTheme();
  const { bottom, left, right, top } = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.card,
      justifyContent: 'space-between',
      paddingBottom: IS_IOS ? bottom + spacingBase.s4 : spacingBase.s4,
      paddingLeft: isPortrait ? spacingBase.s4 : left,
      paddingRight: isPortrait ? spacingBase.s4 : right,
      paddingTop: top,
    },
  });
};

export default useStyles;
