import { StyleSheet } from 'react-native';
import { getTheme } from '@common/helpers';
import { generalStyles, spacingBase } from '@styles';
import { MenuItemProps } from '@components/common/MenuItem/types';

const PADDING_LEFT = 20;
const PADDING_RIGHT = spacingBase.s2;
const ICON_SIZE = 29;

const useStyles = (
  disabled: boolean,
  iconColor: MenuItemProps['iconColor'],
  icon: MenuItemProps['icon'],
) => {
  const { colors, typography } = getTheme();

  const opactity = disabled ? 0.7 : 1;

  const contentBorderLeftPosition = icon
    ? PADDING_LEFT + ICON_SIZE + spacingBase.s3
    : PADDING_LEFT;

  return StyleSheet.create({
    container: {
      ...generalStyles.row,
      backgroundColor: colors.white,
      paddingLeft: PADDING_LEFT,
      paddingVertical: spacingBase.s1,
    },
    pressed: {
      backgroundColor: colors.border,
    },
    iconContainer: {
      marginRight: spacingBase.s3,
      borderRadius: 6,
      width: ICON_SIZE,
      height: ICON_SIZE,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      overflow: 'hidden',
      borderColor: !iconColor ? colors.border : 'transparent',
      backgroundColor: iconColor || 'transparent',
      opactity,
    },
    main: {
      ...generalStyles.rowBetween,
      flex: 1,
      position: 'relative',
    },
    actions: {
      ...generalStyles.row,
      paddingRight: PADDING_RIGHT,
    },
    border: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 1,
      backgroundColor: colors.border,
      left: contentBorderLeftPosition,
    },
    primaryLabel: {
      ...typography.regular.body,
      color: colors.text,
    },
    secondaryLabel: {
      ...typography.regular.body,
      color: colors.gray2,
      marginRight: spacingBase.s1,
    },
  });
};

export default useStyles;
