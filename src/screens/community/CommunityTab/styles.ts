import { spacingBase } from '@styles';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useStyles = () => {
  const { top } = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: top,
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
