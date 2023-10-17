import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { spacingBase, generalStyles } from '@styles';

const useStyles = () => {
  const { colors } = getTheme();

  return StyleSheet.create({
    images: {
      marginHorizontal: -spacingBase.s3,
      marginVertical: spacingBase.s1,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: spacingBase.s1,
      overflow: 'hidden',
    },
    addImage: {
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: colors.gray,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageLoader: {
      borderWidth: 1,
      borderColor: colors.gray,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      ...generalStyles.row,
      gap: spacingBase.s2,
      paddingHorizontal: spacingBase.s3,
    },
  });
};

export default useStyles;
