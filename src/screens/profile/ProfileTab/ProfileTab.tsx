/**
 * @namespace ProfileTab
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
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
    authStore: { logout },
    profileViewStore: { setUserId },
  } = useStores();

  const goToProfile = () => {
    setUserId(id);
    navigate('profile-view');
  };
  const goToSettins = () => navigate('settings');
  const goToSupport = () => navigate('support');
  const goToAboutUs = () => navigate('about-us');

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
        <Pressable style={styles.pressable} onPress={goToProfile}>
          <View style={styles.row}>
            <Icon
              name="person-outline"
              size={24}
              style={styles.icon}
              color={colors.text}
            />
            <Text style={styles.pressableText}>Профіль</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color={colors.gray} />
        </Pressable>
        <Pressable style={styles.pressable} onPress={goToSettins}>
          <View style={styles.row}>
            <Icon
              name="settings-outline"
              size={24}
              style={styles.icon}
              color={colors.text}
            />
            <Text style={styles.pressableText}>Налаштування</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color={colors.gray} />
        </Pressable>
      </View>

      <View style={styles.divider} />

      <View style={styles.block}>
        <Pressable style={styles.pressable} onPress={goToSupport}>
          <View style={styles.row}>
            <Icon
              name="help-circle-outline"
              size={24}
              style={styles.icon}
              color={colors.text}
            />
            <Text style={styles.pressableText}>Підтримка</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color={colors.gray} />
        </Pressable>
        <Pressable style={styles.pressable} onPress={goToAboutUs}>
          <View style={styles.row}>
            <Icon
              name="information-circle-outline"
              size={24}
              style={styles.icon}
              color={colors.text}
            />
            <Text style={styles.pressableText}>Про нас</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color={colors.gray} />
        </Pressable>
      </View>

      <View style={styles.divider} />

      <View style={styles.block}>
        <Pressable style={styles.pressable} onPress={logout}>
          <View style={styles.row}>
            <Icon
              name="log-out-outline"
              size={24}
              style={styles.icon}
              color={colors.text}
            />
            <Text style={styles.pressableText}>Вийти</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default observer(ProfileTab);
