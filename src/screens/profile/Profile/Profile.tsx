/**
 * @namespace Profile
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { ProfileProps } from './types';
import { Dimensions, ScrollView, View } from 'react-native';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from '@components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-ui-lib';

/**
 * Profile
 *
 *
 * @memberof ProfileNavigation
 * @param {ProfileProps} params
 *
 * @example
 * // How to use Profile:
 *  <Profile />
 */
const Profile: React.FC<ProfileProps> = observer(() => {
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
            animate
            label={initials}
            useAutoColors
            name={fullname}
            source={{
              uri: avatar_url || undefined,
            }}
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

export default Profile;
