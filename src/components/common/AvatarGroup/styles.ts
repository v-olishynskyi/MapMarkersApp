import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';

const useStyles = () => {
  const { colors, typography, dark } = getTheme();

  return StyleSheet.create({
    avatarContainer: {
      width: 25,
      height: 25,
      borderRadius: 50,
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatar: {
      width: 24,
      height: 24,
      borderRadius: 50,
      overflow: 'hidden',
    },
    numberOfShowedAvatars: {
      ...typography.regular.caption1,
      color: dark ? colors.black : colors.white,
    },
  });
};

export default useStyles;
