import { getTheme } from '@common/helpers';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useStyles = () => {
  const { colors } = getTheme();
  const { top } = useSafeAreaInsets();

  return StyleSheet.create({
    avatarModalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    bigAvatar: {
      resizeMode: 'contain',
    },
    actions: {
      position: 'absolute',
      top: top,
      right: 16,
      zIndex: 1,
    },
    closeButton: {
      fontSize: 20,
      color: colors.gray6,
    },
  });
};

export default useStyles;
