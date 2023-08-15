/**
 * @namespace ProfileView
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { NavigationType, ProfileViewProps } from './types';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import { Avatar, Pressable } from '@components';
import { generalStyles } from '@styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { getTheme } from '@common/helpers';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

/**
 * ProfileView
 *
 *
 * @memberof ProfileViewNavigation
 * @param {ProfileViewProps} params
 *
 * @example
 * // How to use ProfileView:
 *  <ProfileView />
 */
const ProfileView: React.FC<ProfileViewProps> = observer(() => {
  const { colors } = getTheme();
  const styles = useStyles();
  const { navigate } = useNavigation<NavigationType>();

  const {
    userStore: { loadProfile },
    profileViewStore: { loadUser, isLoading, user, isMe },
  } = useStores();

  useFocusEffect(
    React.useCallback(() => {
      loadUser();
      loadProfile();
    }, [loadUser, loadProfile]),
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={loadUser} />
      }>
      {isLoading ? (
        <ActivityIndicator />
      ) : !user ? (
        <>
          <View>
            <Text>Щось пішло не так. Спробуйте ще раз</Text>
          </View>
          <Pressable onPress={loadUser}>
            <Text>Повторити</Text>
          </Pressable>
        </>
      ) : (
        <View style={styles.profileContainer}>
          <View style={styles.avatar_container}>
            <Avatar
              initials={user!.initials}
              fullname={user!.fullname}
              url={user!.avatar_url || undefined}
              size={110}
            />
          </View>
          <Text style={styles.fullname}>{user?.fullname}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          {user?.username ? (
            <Text style={styles.email}>@{user.username}</Text>
          ) : isMe ? (
            <Pressable
              style={generalStyles.rowBetween}
              onPress={() => navigate('edit-profile')}>
              <Text>Додати імʼя користувача</Text>
              <Icon
                name="chevron-forward-outline"
                size={24}
                color={colors.gray}
              />
            </Pressable>
          ) : null}
        </View>
      )}
    </ScrollView>
  );
});

export default ProfileView;
