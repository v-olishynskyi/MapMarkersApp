import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';

const useStyles = () => {
  const { typography, colors } = getTheme();

  return StyleSheet.create({
    listContainer: { flex: 1, paddingTop: spacingBase.s2 },
    contentContainer: { paddingHorizontal: spacingBase.s3 },
    listEmptyComponentContainer: {
      marginBottom: spacingBase.s3,
    },
    listEmptyComponentTitle: {
      ...typography.regular.subhead,
      color: colors.gray,
      textAlign: 'center',
      marginBottom: spacingBase.s3,
    },
    listEmptyComponentButton: {
      alignSelf: 'center',
    },
  });
};

export default useStyles;
