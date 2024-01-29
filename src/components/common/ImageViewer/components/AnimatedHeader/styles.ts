import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';

const useStyles = () => {
  const { colors, typography } = getTheme();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      zIndex: 1,
      width: '100%',
      justifyContent: 'space-between',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.black,
      opacity: 0.8,
    },
    counter: {
      ...typography.regular.title3,
      color: colors.white,
    },
    flex1: {
      flex: 1,
    },
  });
};

export default useStyles;
