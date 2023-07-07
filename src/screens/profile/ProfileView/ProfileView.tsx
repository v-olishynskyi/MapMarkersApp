/**
 * @namespace ProfileView
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { ProfileViewProps } from './types';
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
import { getTheme, showToast } from '@utils/helpers';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParamsList } from '@navigation';
import { UserModel } from '@models';

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
  const { params } = useRoute<RouteProp<AppStackParamsList, 'profile-view'>>();

  const {
    userStore: { loadProfile, user: currentUser, isLoading: isLoadingProfile },
  } = useStores();

  const { colors } = getTheme();
  const styles = useStyles();

  const [isLoadingUser, setIsLoadingUser] = React.useState(false);
  const [anotherUser, setAnotherUser] = React.useState<UserModel | null>(null);

  const isMe = React.useMemo(() => params && params.userId, [params]);

  const isLoading = React.useMemo(
    () => isLoadingUser || isLoadingProfile,
    [isLoadingUser, isLoadingProfile],
  );

  const user = React.useMemo(
    () => anotherUser || currentUser,
    [anotherUser, currentUser],
  );

  const loadUser = React.useCallback(async () => {
    try {
      setIsLoadingUser(true);
      const loadedUser = await UserModel.get(params!.userId!);
      setAnotherUser(new UserModel(loadedUser));
    } catch (error: any) {
      showToast('error', error.message);
    } finally {
      setIsLoadingUser(false);
    }
  }, [params]);

  React.useEffect(() => {
    if (params?.userId) {
      loadUser();
    } else {
      loadProfile();
    }
  }, [params, loadProfile, loadUser]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={isMe ? loadProfile : loadUser}
        />
      }>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.profileContainer}>
          <View style={styles.avatar_container}>
            <Avatar
              initials={user.initials}
              fullname={user.fullname}
              url={user.avatar_url || undefined}
              size={110}
            />
          </View>
          <Text style={styles.fullname}>{user.fullname}</Text>
          <Text style={styles.email}>{user.email}</Text>
          {user.username ? (
            <Text style={styles.email}>@{user.username}</Text>
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
      )}
    </ScrollView>
  );
});

export default ProfileView;
