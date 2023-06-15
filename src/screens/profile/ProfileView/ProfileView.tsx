/**
 * @namespace ProfileView
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { ProfileViewProps } from './types';
import { Dimensions, ScrollView, View } from 'react-native';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import { Avatar, Button } from '@components';

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
  const styles = useStyles();

  const {
    userStore: { loadProfile, initials, avatar_url, fullname },
    authStore: { logout, isLoading: isLoadingLogout },
    uiStore: { isPortrait },
  } = useStores();

  React.useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}>
      <View style={styles.profileContainer}>
        <View style={styles.avatar_container}>
          <Avatar
            initials={initials}
            fullname={fullname}
            url={avatar_url || undefined}
            size={
              Dimensions.get('window')[isPortrait ? 'width' : 'height'] * 0.3
            }
          />
        </View>
      </View>
      <Button label="Вийти" onPress={logout} loading={isLoadingLogout} />
    </ScrollView>
  );
});

export default ProfileView;
