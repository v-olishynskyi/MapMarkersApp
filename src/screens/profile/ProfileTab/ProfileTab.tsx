/**
 * @namespace ProfileTab
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, View } from 'react-native';
import { Avatar, Pressable } from '@components';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import { getTheme } from '@common/helpers';
import { spacingBase } from '@styles';
import { useNavigation } from '@react-navigation/native';
import { AppStackParamsList, ProfileStackParamsList } from '@navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * ProfileTab
 *
 *
 * @memberof ProfileTab
 *
 * @example
 * // How to use ProfileTab:
 *  <ProfileTab />
 */
const ProfileTab: React.FC = () => {
  const styles = useStyles();

  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<AppStackParamsList & ProfileStackParamsList>
    >();

  const { colors } = getTheme();

  const {
    userStore: {
      user: { id, avatar_url, fullname, initials, email },
    },
    authStore: { logout, isLoading },
  } = useStores();

  const goToProfile = () => {
    navigate('profile-view', { userId: id });
  };
  const goToSettins = () => navigate('settings');
  const goToSupport = () => navigate('support');
  const goToAboutUs = () => navigate('about-us');

  const MenuItem = React.useCallback(
    ({
      icon,
      label,
      onPress,
    }: {
      icon: string;
      label: string;
      onPress: VoidFunction;
    }) => (
      <Pressable style={styles.pressable} onPress={onPress}>
        <View style={styles.row}>
          <Icon name={icon} size={24} style={styles.icon} color={colors.text} />
          <Text style={styles.pressableText}>{label}</Text>
        </View>
        <Icon name="chevron-forward-outline" size={24} color={colors.gray} />
      </Pressable>
    ),
    // eslint-disable-next-line
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.userContainer}>
        <Avatar
          fullname={fullname}
          initials={initials}
          url={avatar_url}
          containerStyle={{ marginRight: spacingBase.s2 }}
        />
        <View style={styles.userInfo}>
          <Text style={styles.fullname}>{fullname}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.block}>
        <MenuItem icon="person-outline" label="Профіль" onPress={goToProfile} />
        <MenuItem
          icon="settings-outline"
          label="Налаштування"
          onPress={goToSettins}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.block}>
        <MenuItem
          icon="help-circle-outline"
          label="Підтримка"
          onPress={goToSupport}
        />
        <MenuItem
          icon="information-circle-outline"
          label="Про нас"
          onPress={goToAboutUs}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.block}>
        <Pressable
          style={styles.pressable}
          onPress={logout}
          disabled={isLoading}>
          <View style={styles.row}>
            {isLoading ? (
              <ActivityIndicator size={'small'} style={styles.icon} />
            ) : (
              <Icon
                name="log-out-outline"
                size={24}
                style={styles.icon}
                color={colors.text}
              />
            )}
            <Text style={styles.pressableText}>Вийти</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default observer(ProfileTab);
