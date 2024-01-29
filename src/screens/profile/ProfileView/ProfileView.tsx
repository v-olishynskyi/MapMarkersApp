/**
 * @namespace ProfileView
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { NavigationType, ProfileViewProps, RouteType } from './types';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import { Avatar, ImageViewer, Pressable } from '@components';
import { generalStyles } from '@styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { getTheme } from '@common/helpers';
import { useNavigation, useRoute } from '@react-navigation/native';
import ActionSheet from 'react-native-ui-lib/actionSheet';
import { openPicker } from 'react-native-image-crop-picker';
import useProfileViewUser from './hooks/useProfileViewUser';

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
  const { navigate, setOptions } = useNavigation<NavigationType>();
  const { params } = useRoute<RouteType>();

  const {
    userStore: { changeAvatar, removeAvatar },
  } = useStores();

  const imageViewerRef = React.useRef<ImageViewer>(null);

  const { isLoading, user, loadUser, isMe } = useProfileViewUser(
    params?.userId || '',
  );

  const [showActionSheet, setShowActionSheet] = React.useState(false);

  const handlePressEditAvatar = async () => {
    openPicker({
      cropping: true,
      mediaType: 'photo',
      cropperCircleOverlay: true,
    }).then(changeAvatar);
  };
  const handlePressViewAvatar = () => imageViewerRef.current?.show();
  const handlePressAvatar = () =>
    isMe ? setShowActionSheet(true) : handlePressViewAvatar();
  const onDismissActionSheet = () => setShowActionSheet(false);

  const actionSheetOptions = [
    {
      label: 'Перегляд',
      onPress: handlePressViewAvatar,
    },
    {
      label: 'Змінити',
      onPress: handlePressEditAvatar,
    },
    {
      label: 'Видалити',
      onPress: removeAvatar,
    },
    { label: 'Закрити' },
  ];

  const profileHeaderRight = React.useCallback(() => {
    return (
      <Pressable onPress={() => navigate('edit-profile' as any)}>
        <Icon name="md-pencil" size={24} color={colors.primary} />
      </Pressable>
    );
  }, [colors.primary, navigate]);

  React.useEffect(() => {
    isMe &&
      setOptions({
        headerRight: profileHeaderRight,
      });
  }, [setOptions, profileHeaderRight, isMe]);

  const noUserError = (
    <>
      <View>
        <Text>Щось пішло не так. Спробуйте ще раз</Text>
      </View>
      <Pressable onPress={loadUser}>
        <Text>Повторити</Text>
      </Pressable>
    </>
  );

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadUser} />
        }>
        {isLoading ? (
          <ActivityIndicator />
        ) : !user ? (
          noUserError
        ) : (
          <View style={styles.profileContainer}>
            <View style={styles.avatar_container}>
              <Avatar
                initials={user!.initials}
                fullname={user!.fullname}
                url={user.avatar_url}
                size={110}
                onPress={handlePressAvatar}
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
      {isMe && (
        <ActionSheet
          visible={showActionSheet}
          cancelButtonIndex={3}
          destructiveButtonIndex={2}
          useNativeIOS
          options={actionSheetOptions}
          onDismiss={onDismissActionSheet}
        />
      )}
      {user.avatar_url && (
        <ImageViewer ref={imageViewerRef} images={[user.avatar_url]} />
      )}
    </>
  );
});

export default ProfileView;
