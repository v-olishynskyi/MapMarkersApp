import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  const { typography } = getTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    currentSessionMenu: {
      margin: spacingBase.s3,
    },
    contentContainer: {
      padding: spacingBase.s3,
    },
    rectButton: {
      flex: 1,
      height: 80,
      paddingVertical: 10,
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      flexDirection: 'column',
      backgroundColor: 'white',
    },
    headerRightText: { ...typography.regular.body },
  });
};

export default useStyles;
