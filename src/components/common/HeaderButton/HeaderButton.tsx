/**
 * @namespace HeaderButton
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { HeaderButtonProps } from './types';
import { navigationRef } from '@navigation';
import { Pressable } from '@components';
import { generalStyles } from '@styles';
import { ActivityIndicator, Text } from 'react-native';
import { getTheme } from '@common/helpers';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * HeaderButton
 *
 * @memberof
 * @param {HeaderButtonProps} params
 *
 * @example
 * // How to use HeaderButton:
 *  <HeaderButton />
 */
const HeaderButton: React.FC<HeaderButtonProps> = ({
  canGoBack,
  label,
  color,
  loading,
  onPress,
  backRoute = '',
  disabled,
  icon = '',
  shouldGoBack = true,
}) => {
  const { colors } = getTheme();
  const styles = useStyles(Boolean(loading) || Boolean(disabled), color);

  const handlePress = async () => {
    try {
      onPress && (await onPress());

      shouldGoBack
        ? canGoBack
          ? navigationRef.goBack()
          : navigationRef.navigate(backRoute)
        : null;
    } catch (error) {}
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[generalStyles.row]}
      disabled={disabled || loading}>
      {loading && <ActivityIndicator size={'small'} style={styles.loader} />}
      {Boolean(label) && <Text style={styles.label}>{label}</Text>}
      {Boolean(icon) && !loading && (
        <Icon name={icon} size={24} color={colors.primary} />
      )}
    </Pressable>
  );
};

export default HeaderButton;
