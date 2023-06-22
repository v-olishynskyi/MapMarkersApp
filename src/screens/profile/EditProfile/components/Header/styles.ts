import { StyleSheet } from 'react-native';
import { getTheme } from '@utils/helpers';
import { generalStyles, spacingBase } from '@styles';

const useStyles = () => {
  const { typography } = getTheme();

  return StyleSheet.create({
    container: {
      ...generalStyles.row,
      marginTop: 14,
      paddingHorizontal: spacingBase.s1,
      height: 42,
      borderBottomColor: 'rgba(0, 0, 0, 0.30)',
      borderBottomWidth: 0.5,
    },
    title: {
      ...typography.bold.body,
      flex: 1,
      textAlign: 'center',
      // alignSelf: 'center',
    },
  });
};

export default useStyles;
