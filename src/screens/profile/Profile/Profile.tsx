/**
 * @namespace Profile
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { ProfileProps } from './types';
import { Text, View } from 'react-native';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-native-ui-lib';

/**
 * Profile
 *
 *
 * @memberof
 * @param {ProfileProps} params
 *
 * @example
 * // How to use Profile:
 *  <Profile />
 */
const Profile: React.FC<ProfileProps> = observer(() => {
  const styles = useStyles();

  const {
    userStore,
    authStore: { logout },
  } = useStores();

  return (
    <View style={styles.container}>
      <Text>email {userStore?.email}</Text>
      <Button label="Logout" onPress={logout} />
    </View>
  );
});

export default Profile;
