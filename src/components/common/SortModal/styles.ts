import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';

const useStyles = () => {
  const { typography, colors } = getTheme();

  return StyleSheet.create({
    // bottom sheet styles
    background: {
      backgroundColor: colors.card,
    },
    handleIndicator: {
      backgroundColor: colors.gray,
    },
    sheetContent: {
      paddingHorizontal: spacingBase.s3,
    },

    // radiobutton
    radioButtonContainer: {
      justifyContent: 'space-between',
      marginBottom: spacingBase.s2,
    },
    radioButtonLabel: {
      ...typography.regular.subhead,
      color: colors.text,
    },
  });
};

export default useStyles;
