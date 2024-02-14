import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';

const useStyles = () => {
  const {} = getTheme();

  return StyleSheet.create({
    listContainer: { flex: 1, paddingTop: spacingBase.s2 },
    contentContainer: { paddingHorizontal: spacingBase.s3 },
  });
};

export default useStyles;
