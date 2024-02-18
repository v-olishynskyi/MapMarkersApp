import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { spacingBase, generalStyles } from '@styles';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

const useStyles = () => {
  const { typography, colors } = getTheme();

  return StyleSheet.create({
    contentContainer: {
      paddingHorizontal: spacingBase.s3,
      justifyContent: 'space-between',
    },
    errorLabel: {
      ...typography.regular.body,
      color: colors.text,
      marginBottom: spacingBase.s3,
    },
    header: {
      ...generalStyles.rowBetween,
      paddingHorizontal: spacingBase.s3,
      marginBottom: spacingBase.s2,
    },
    headerActions: {
      ...generalStyles.row,
      gap: spacingBase.s3,
    },
    markerActions: {
      ...generalStyles.row,
      gap: spacingBase.s1,
    },

    name: {
      ...typography.regular.title3,
      color: colors.text,
      flex: 0.98,
    },
    description: {
      ...typography.regular.body,
      color: colors.gray,
      marginBottom: spacingBase.s3,
    },
    markerImageList: {
      marginHorizontal: -spacingBase.s2,
    },
    markerImageListContent: {
      gap: spacingBase.s2,
      paddingHorizontal: spacingBase.s2,
    },
    markerImage: {
      width: SCREEN_WIDTH - spacingBase.s2 * 2 - 20,
      height: SCREEN_WIDTH - spacingBase.s2 * 2,
      borderRadius: spacingBase.s1,
    },
  });
};

export default useStyles;
