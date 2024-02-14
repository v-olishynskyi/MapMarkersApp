import { StyleSheet } from 'react-native';
import { spacingBase } from '@styles';
import { getTheme } from '@common/helpers';

const useStyles = () => {
  const { typography, colors } = getTheme();

  return StyleSheet.create({
    container: { marginBottom: spacingBase.s3 },
    avatar: { marginRight: spacingBase.s2 },
    contentContainer: {
      flex: 1,
    },
    groupName: {
      ...typography.bold.body,
      color: colors.text,
    },
    createdBy: {
      ...typography.regular.caption1,
      color: colors.gray,
    },
    author: {
      fontWeight: 'bold',
      color: colors.text,
      opacity: 0.8,
    },
    descriptionContainer: {
      // flex: 1,
      gap: 2,
    },
    members: {
      ...typography.regular.caption1,
      color: colors.gray,
    },
    groupInfo: {},
  });
};

export default useStyles;
