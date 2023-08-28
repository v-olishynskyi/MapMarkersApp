import { StyleSheet } from 'react-native';
import { spacingBase } from '@styles';
import { getTheme } from '@common/helpers';

const useStyles = () => {
  const { typography, colors } = getTheme();

  return StyleSheet.create({
    container: { marginBottom: spacingBase.s3 },
    avatar: { marginRight: spacingBase.s2 },
    fullname: {
      ...typography.regular.body,
      color: colors.text,
    },
    email: {
      ...typography.regular.callout,
      color: colors.text,
    },
  });
};

export default useStyles;
