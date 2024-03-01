import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';

const useStyles = () => {
  const {} = getTheme();

  return StyleSheet.create({
    listContainer: {
      paddingTop: spacingBase.s2,
    },
    contentContainer: {
      paddingHorizontal: spacingBase.s3,
      paddingBottom: spacingBase.s4,
    },
    itemContainer: {
      marginBottom: spacingBase.s3,
    },
  });
};

export default useStyles;
