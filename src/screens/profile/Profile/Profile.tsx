/**
 * @namespace Profile
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { ProfileProps } from './types';
import { Dimensions, Text, View } from 'react-native';
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
    userStore: { user, loadProfile },
    authStore: { logout, isLoading: isLoadingLogout },
    uiStore: { isPortrait },
  } = useStores();

  React.useEffect(() => {
    loadProfile();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatar_container}>
          <Avatar
            animate
            source={{
              uri:
                user.avatar_url ||
                'https://www.cinebuster.in/wp-content/uploads/2022/10/Untitled-20-scaled.jpg',
            }}
            size={
              Dimensions.get('window')[isPortrait ? 'width' : 'height'] * 0.4
            }
          />
        </View>
      </View>
      <Button label="Вийти" onPress={logout} loading={isLoadingLogout} />
    </SafeAreaView>
  );
});

export default Profile;
