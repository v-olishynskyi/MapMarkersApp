import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useStyles = () => {
  const { colors, typography } = getTheme();
  const { top } = useSafeAreaInsets();

  return StyleSheet.create({
    modalContainer: {
      backgroundColor: colors.background,
      paddingTop: top,
      flex: 1,
    },
    modalHeaderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 2,
      paddingVertical: spacingBase.s2,
      paddingHorizontal: spacingBase.s3,
    },
    modalHeaderTitle: {
      ...typography.regular.title1,
      color: colors.text,
      flexGrow: 1,
      textAlign: 'center',
      flex: 0.99,
    },
    flatList: { flex: 1 },
    flatListContent: {
      flex: 1,
      paddingHorizontal: spacingBase.s3,
      gap: spacingBase.s2,
    },
    flatListCol: { justifyContent: 'space-between' },

    imageMiniatureContainer: {
      flex: 0.49,
      height: 200,
    },
    imageMiniature: {
      flex: 1,
      height: 200,
      borderRadius: spacingBase.s2,
      overflow: 'hidden',
      resizeMode: 'contain',
    },
  });
};

export default useStyles;
