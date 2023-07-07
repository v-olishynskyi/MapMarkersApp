/**
 * @namespace Users
 * @category
 * @subcategory
 *  */
import React, { useEffect } from 'react';
import useStyles from './styles';
import { CommunityProps } from './types';
import { observer } from 'mobx-react-lite';
import { useStores } from '@store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Text, View } from 'react-native';
import { Avatar, Pressable } from '@components';
import { generalStyles } from '@styles';
import { getUserInitials } from '@utils/helpers';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamsList } from '@navigation';

/**
 * Community
 *
 *
 * @memberof
 * @param {CommunityProps} params
 *
 * @example
 * // How to use Community:
 *  <Community />
 */
const Community: React.FC<CommunityProps> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();

  const styles = useStyles();

  const {
    communityStore: { loadUsers, isLoading, users },
  } = useStores();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        data={users}
        renderItem={({ item: user }) => {
          const fullname = `${user.first_name} ${user.last_name}`;
          const initials = getUserInitials(fullname);

          return (
            <Pressable
              style={[generalStyles.row, { marginBottom: 16 }]}
              onPress={() =>
                navigation.navigate('profile-view', { userId: user.id })
              }>
              <Avatar
                size={40}
                fullname={fullname}
                initials={initials}
                url={user.avatar_url}
                containerStyle={{ marginRight: 12 }}
              />
              <View>
                <Text>{fullname}</Text>
                <Text>{user.email}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default observer(Community);
