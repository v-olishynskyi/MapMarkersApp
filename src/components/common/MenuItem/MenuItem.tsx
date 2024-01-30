/**
 * @namespace MenuItem
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { MenuItemProps } from './types';
import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getTheme } from '@common/helpers';

/**
 * MenuItem
 *
 *
 * @memberof
 * @param {MenuItemProps} params
 *
 * @example
 * // How to use MenuItem:
 *  <MenuItem icon={<Icon name="icon" />} label="Пристрої" onPress={() => {}} />
 */
const MenuItem: React.FC<MenuItemProps> = ({
  iconColor,
  icon,
  label,
  secondaryLabel,
  disabled,
  onPress,
  isLast,
  containerStyle,
  actions,
}) => {
  const { colors } = getTheme();

  const styles = useStyles(!!disabled, iconColor, icon);

  const defaultActions = (
    <>
      {!!secondaryLabel && (
        <Text style={styles.secondaryLabel}>
          {typeof secondaryLabel !== 'string'
            ? secondaryLabel.toString()
            : secondaryLabel}
        </Text>
      )}
      {onPress && (
        <Icon name="chevron-forward" size={20} color={colors.gray2} />
      )}
    </>
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        containerStyle,
      ]}
      disabled={!onPress}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.main}>
        <Text style={styles.primaryLabel}>{label}</Text>
        <View style={styles.actions}>{actions || defaultActions}</View>
      </View>
      {!isLast && <View style={[styles.border]} />}
    </Pressable>
  );
};

export default MenuItem;
