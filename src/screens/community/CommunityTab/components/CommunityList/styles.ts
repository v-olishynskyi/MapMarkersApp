import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';

const useStyles = () => {
  const {} = getTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: spacingBase.s2,
    },
    listContainer: { flex: 1 },
    contentContainer: { paddingHorizontal: spacingBase.s3 },
    searchContainer: {
      paddingHorizontal: spacingBase.s3,
      marginBottom: spacingBase.s2,
    },
  });
};

export default useStyles;
