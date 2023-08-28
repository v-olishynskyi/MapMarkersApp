import { StyleSheet } from 'react-native';
import { IS_IOS, getTheme } from '@common/helpers';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStores } from '@store';
import { spacingBase } from '@styles';

const useStyles = () => {
  const {
    uiStore: { isPortrait },
  } = useStores();
  const { bottom, left, right } = useSafeAreaInsets();
  const { colors } = getTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      backgroundColor: colors.background,
      justifyContent: 'space-between',
      paddingBottom: IS_IOS ? bottom + spacingBase.s4 : spacingBase.s4,
      paddingLeft: isPortrait ? spacingBase.s4 : left,
      paddingRight: isPortrait ? spacingBase.s4 : right,
      paddingTop: spacingBase.s3,
    },
    inputContainer: {
      marginBottom: spacingBase.s3,
    },
    input: { color: colors.text },
  });
};

export default useStyles;
