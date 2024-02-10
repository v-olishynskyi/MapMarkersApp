/**
 * @namespace ProfileInfo
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { ProfileInfoProps } from './types';
import { Text, View } from 'react-native';
import { generalStyles } from '@styles';
import { Pressable } from '@components';
import Icon from 'react-native-vector-icons/Ionicons';
import { getTheme } from '@common/helpers';
import { useStores } from '@store';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../../types';

/**
 * ProfileInfo
 *
 * @memberof
 * @param {ProfileInfoProps} params
 *
 * @example
 * // How to use ProfileInfo:
 *  <ProfileInfo />
 */
const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  const styles = useStyles();
  const { colors } = getTheme();
  const { navigate } = useNavigation<NavigationType>();

  const {
    userStore: { user: currentUser },
  } = useStores();

  const navigateToEditProfile = React.useCallback(
    () => navigate('user-markers', { userId: user.id }),
    [navigate, user?.id],
  );

  const isMe = currentUser.id === user.id;

  return (
    <>
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
          <Text style={styles.addUsernameButton}>Додати імʼя користувача</Text>
          <Icon name="chevron-forward-outline" size={24} color={colors.gray} />
        </Pressable>
      ) : null}
    </>
  );
};

export default ProfileInfo;
