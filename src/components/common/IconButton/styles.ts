import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { useStores } from '@store';

const useStyles = () => {
  const { colors } = getTheme();
  const {
    uiStore: { isDark },
  } = useStores();

  return StyleSheet.create({
    container: {
      borderRadius: 100,
      backgroundColor: isDark ? colors.gray2 : colors.gray2,
      width: 28,
      height: 28,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: { paddingLeft: 1 },
  });
};

export default useStyles;
