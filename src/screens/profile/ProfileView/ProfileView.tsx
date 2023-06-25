/**
 * @namespace ProfileView
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { ProfileViewProps } from './types';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import { Avatar, Pressable } from '@components';
import { generalStyles } from '@styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { getTheme } from '@utils/helpers';

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

  const {
    userStore: {
      loadProfile,
      initials,
      avatar_url,
      fullname,
      email,
      username,
      isLoading,
    },
  } = useStores();

  React.useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={loadProfile} />
      }>
      <View style={styles.profileContainer}>
        <View style={styles.avatar_container}>
          <Avatar
            initials={initials}
            fullname={fullname}
            url={avatar_url || undefined}
            size={110}
          />
        </View>
        <Text style={styles.fullname}>{fullname}</Text>
        <Text style={styles.email}>{email}</Text>
        {username ? (
          <Text style={styles.email}>@{username}</Text>
        ) : (
          <Pressable style={generalStyles.rowBetween}>
            <Text>@ Додати username</Text>
            <Icon
              name="chevron-forward-outline"
              size={24}
              color={colors.gray}
            />
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
});

export default ProfileView;
