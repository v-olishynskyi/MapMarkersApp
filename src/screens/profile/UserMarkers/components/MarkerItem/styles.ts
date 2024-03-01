import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';

const useStyles = () => {
  const { typography, colors } = getTheme();

  return StyleSheet.create({
    container: {},
    image: {
      width: 80,
      height: 80,
      marginRight: spacingBase.s3,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    content: {
      flex: 1,
      height: '100%',
    },
    name: {
      ...typography.bold.body,
      color: colors.text,
      marginBottom: 4,
    },
    title: {
      ...typography.regular.caption1,
      color: colors.gray,
    },
    description: {
      ...typography.regular.caption1,
      color: colors.gray,
    },
    userCard: { marginTop: spacingBase.s1 },
  });
};

export default useStyles;
