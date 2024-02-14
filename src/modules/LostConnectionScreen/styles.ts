import { StyleSheet } from 'react-native';

import { getTheme } from '@common/helpers';

const useStyles = () => {
  const { colors } = getTheme();

  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.black,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default useStyles;
