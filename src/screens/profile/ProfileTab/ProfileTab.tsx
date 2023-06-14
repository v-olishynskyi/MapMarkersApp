/**
 * @namespace ProfileTab
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { Avatar } from '@components';
import { useStores } from '@store';

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

  const {
    userStore: { avatar_url, fullname, initials, email },
  } = useStores();
  console.log('file: ProfileTab.tsx:28 - fullname:', fullname);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Avatar
          fullname={fullname}
          initials={initials}
          url={avatar_url}
          containerStyle={{ marginRight: 16 }}
        />
        <View style={{ justifyContent: 'space-between' }}>
          <Text>{fullname}</Text>
          <Text>{email}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileTab;
