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
  const { bottom, left, right } = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'space-between',
      paddingBottom: IS_IOS ? bottom + spacingBase.s4 : spacingBase.s4,
      paddingLeft: isPortrait ? spacingBase.s4 : left,
      paddingRight: isPortrait ? spacingBase.s4 : right,
      paddingTop: spacingBase.s3,
    },
    form: {
      width: '100%',
    },
    input: {
      marginBottom: spacingBase.s3,
    },
    forgotPassword: {
      alignSelf: 'flex-start',
    },
    submitButton: {
      marginBottom: spacingBase.s2,
    },
  });
};

export default useStyles;
