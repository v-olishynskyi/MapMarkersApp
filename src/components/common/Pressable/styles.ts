import { StyleSheet } from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    default: { opacity: 1 },
    pressed: { opacity: 0.5 },
  });
};

export default useStyles;
