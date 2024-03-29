/**
 * @namespace ProfileView
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { NavigationType, ProfileViewProps, RouteType } from './types';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import {
  Avatar,
  HeaderButton,
  ImageViewer,
  LoaderRefresh,
  Menu,
  Pressable,
} from '@components';
import { collectFileFormData } from '@common/helpers';
import { useNavigation, useRoute } from '@react-navigation/native';
import ActionSheet from 'react-native-ui-lib/actionSheet';
import { openPicker } from 'react-native-image-crop-picker';
import useProfileViewUser from './hooks/useProfileViewUser';
import { FileTypes } from '@common/types';
import { useChangeAvatar, useDeleteAvatar } from '@api/hooks/profile';
import { ProfileInfo } from './components';

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
const ProfileView: React.FC<ProfileViewProps> = () => {
  const styles = useStyles();
  const { navigate, setOptions } = useNavigation<NavigationType>();
  const { params } = useRoute<RouteType>();

  const imageViewerRef = React.useRef<ImageViewer>(null);

  const { isLoading, user, refetch, isMe } = useProfileViewUser(
    params?.userId || '',
  );

  const { mutateAsync: uploadAvatar } = useChangeAvatar();
  const { mutateAsync: deleteAvatar } = useDeleteAvatar();

  const [showActionSheet, setShowActionSheet] = React.useState(false);

  const handlePressEditAvatar = async () => {
    openPicker({
      cropping: true,
      mediaType: 'photo',
      cropperCircleOverlay: true,
    }).then(async image => {
      const formData = collectFileFormData(image, FileTypes.Avatar);

      await uploadAvatar(formData);
      refetch();
    });
  };

  const handlePressViewAvatar = () => imageViewerRef.current?.show();

  const handlePressAvatar = () =>
    isMe ? setShowActionSheet(true) : handlePressViewAvatar();

  const navigateToUserMarkers = () =>
    navigate('user-markers', { userId: user.id });
  const navigateToUserGroups = () =>
    navigate('user-groups', { userId: user.id });

  const navigateToEditProfile = React.useCallback(
    () => navigate('edit-profile'),
    [navigate],
  );

  const handleRemoveAvatar = async () => {
    await deleteAvatar();
    refetch();
  };

  const onDismissActionSheet = () => setShowActionSheet(false);

  const viewAvatarOption = [
    {
      label: 'Перегляд',
      onPress: handlePressViewAvatar,
    },
  ];

  const deleteAvatarOption = [
    {
      label: 'Видалити',
      onPress: handleRemoveAvatar,
    },
  ];

  const actionSheetOptions = [
    ...(user?.avatar ? viewAvatarOption : []),
    {
      label: 'Змінити',
      onPress: handlePressEditAvatar,
    },
    ...(user?.avatar ? deleteAvatarOption : []),
    { label: 'Закрити' },
  ];

  const profileHeaderRight = React.useCallback(() => {
    return (
      <HeaderButton
        onPress={navigateToEditProfile}
        icon="md-pencil"
        shouldGoBack={false}
      />
    );
  }, [navigateToEditProfile]);

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
      <Pressable onPress={refetch}>
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
          <LoaderRefresh isRefreshing={isLoading} onRefresh={refetch} />
        }>
        {isLoading ? (
          <ActivityIndicator />
        ) : !user ? (
          noUserError
        ) : (
          <>
            <View style={styles.profileContainer}>
              <View style={styles.avatarContainer}>
                <Avatar
                  initials={user.initials}
                  fullname={user.fullname}
                  url={user.avatar_url}
                  size={110}
                  onPress={handlePressAvatar}
                />
              </View>
              <ProfileInfo user={user} />
            </View>
            <Menu
              style={styles.markers}
              items={[
                {
                  label: 'Маркери',
                  secondaryLabel: user.markers?.items?.length || 0,
                  onPress: navigateToUserMarkers,
                },
                {
                  label: 'Групи',
                  secondaryLabel: user.groups?.items?.length || 0,
                  onPress: navigateToUserGroups,
                },
              ]}
            />
          </>
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
      {user?.avatar_url && (
        <ImageViewer ref={imageViewerRef} images={[user.avatar_url]} />
      )}
    </>
  );
};

export default observer(ProfileView);
