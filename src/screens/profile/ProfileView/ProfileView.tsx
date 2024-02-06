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
import { observer } from 'mobx-react-lite';
import { Avatar, ImageViewer, Menu, Pressable } from '@components';
import { generalStyles } from '@styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { collectFileFormData, getTheme } from '@common/helpers';
import { useNavigation, useRoute } from '@react-navigation/native';
import ActionSheet from 'react-native-ui-lib/actionSheet';
import { openPicker } from 'react-native-image-crop-picker';
import useProfileViewUser from './hooks/useProfileViewUser';
import { FileTypes } from '@common/types';
import { useChangeAvatar, useDeleteAvatar } from '@api/hooks/profile';

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
  const { colors } = getTheme();
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

  const navigateToEditProfile = React.useCallback(
    () => navigate('user-markers', { userId: user.id }),
    [navigate, user?.id],
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
      <Pressable onPress={navigateToEditProfile}>
        <Icon name="md-pencil" size={24} color={colors.primary} />
      </Pressable>
    );
  }, [colors.primary, navigateToEditProfile]);

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
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
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
              <View style={[generalStyles.rowBetween]}>
                <Text style={styles.label}>ПІБ</Text>
                <Text style={styles.fullname}>{user?.fullname}</Text>
              </View>
              <View style={[generalStyles.rowBetween]}>
                <Text style={styles.label}>E-mail</Text>
                <Text style={styles.fullname}>{user?.email}</Text>
              </View>
              {user?.username ? (
                <View style={[generalStyles.rowBetween]}>
                  <Text style={styles.label}>Імʼя користувача</Text>
                  <Text style={styles.fullname}>@{user.username}</Text>
                </View>
              ) : isMe ? (
                <Pressable
                  style={generalStyles.rowBetween}
                  onPress={navigateToEditProfile}>
                  <Text style={styles.addUsernameButton}>
                    Додати імʼя користувача
                  </Text>
                  <Icon
                    name="chevron-forward-outline"
                    size={24}
                    color={colors.gray}
                  />
                </Pressable>
              ) : null}
            </View>
            <Menu
              style={styles.markers}
              items={[
                {
                  label: 'Маркери',
                  secondaryLabel: user.markers?.items?.length || 0,
                  onPress: navigateToUserMarkers,
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
