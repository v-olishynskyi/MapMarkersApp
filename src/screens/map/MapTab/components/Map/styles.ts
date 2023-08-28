import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';

const useStyles = () => {
  const {} = getTheme();

  return StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });
};

export default useStyles;
