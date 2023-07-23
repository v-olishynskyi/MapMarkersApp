import { useStores } from '@store';
import { spacingBase } from '@styles';
import { IS_IOS, getTheme } from '@common/helpers';
import { Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useStyles = () => {
  const {
    uiStore: { isPortrait },
  } = useStores();
  const { colors, typography } = getTheme();
  const { bottom, left, right } = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingBottom: IS_IOS ? bottom + spacingBase.s4 : spacingBase.s4,
    },
    contentStyles: {
      flex: 1,
    },
    image: {
      width: '100%',
      height: isPortrait
        ? Dimensions.get('screen').width * 1
        : Dimensions.get('screen').height * 0.6,
      marginBottom: spacingBase.s4,
    },
    content: {
      paddingLeft: isPortrait ? spacingBase.s4 : left,
      paddingRight: isPortrait ? spacingBase.s4 : right,
      alignItems: 'center',
      flex: 1,
      justifyContent: 'space-between',
    },
    title: {
      ...typography.bold.title1,
      textAlign: 'center',
      marginBottom: spacingBase.s3,
    },
    description: {
      ...typography.regular.callout,
      color: colors.gray,
      textAlign: 'center',
    },
    stepper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: spacingBase.s5,
    },
    step: {
      width: 8,
      height: 8,
      borderRadius: 100,
      backgroundColor: colors.primary,
      marginRight: 4,
    },
    activeStep: {
      width: 30,
    },
    button: {
      width: Dimensions.get('screen').width * 0.5,
      marginBottom: spacingBase.s2,
    },
  });
};

export default useStyles;
