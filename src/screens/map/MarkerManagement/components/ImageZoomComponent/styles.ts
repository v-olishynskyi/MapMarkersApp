import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';

const useStyles = () => {
  const {} = getTheme();

  return StyleSheet.create({
    image: {
      width: '100%',
      height: '100%',
    },
    imageContainer: {
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center',
    },
  });
};

export default useStyles;
