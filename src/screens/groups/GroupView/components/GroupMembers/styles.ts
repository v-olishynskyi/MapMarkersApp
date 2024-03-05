import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';

const useStyles = () => {
  const { typography, colors } = getTheme();

  return StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    count: {
      ...typography.regular.caption1,
      color: colors.gray,
      marginRight: spacingBase.s4,
    },
    joinStatusContainer: { marginLeft: spacingBase.s4 },
    joinStatus: {
      ...typography.regular.caption2,
      color: colors.gray,
      marginLeft: 4,
    },
  });
};

export default useStyles;
