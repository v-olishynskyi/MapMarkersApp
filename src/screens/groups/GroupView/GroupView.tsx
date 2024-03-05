import { useGroup, useJoinGroup, useLeaveGroup } from '@api/hooks/groups';
import {
  Button,
  FastImageProgress,
  HeaderButton,
  Loader,
  LoaderRefresh,
} from '@components';
import { GroupsStackParamsList } from '@navigation';
import {
  HeaderBackButton,
  HeaderBackButtonProps,
  HeaderButtonProps,
} from '@react-navigation/elements';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, Text } from 'react-native';
import useStyles from './styles';
import { GroupMembers } from './components';
import { getTheme } from '@common/helpers';
import { useStores } from '@store';

const defaultGroupImage = require('../../../assets/images/group.jpeg');

const GroupView: React.FC = () => {
  const { colors } = getTheme();
  const styles = useStyles();
  const {
    userStore: {
      user: { id: userId },
    },
  } = useStores();
  const { setOptions, goBack, navigate } =
    useNavigation<NativeStackNavigationProp<GroupsStackParamsList>>();
  const { params } = useRoute<RouteProp<GroupsStackParamsList, 'group-view'>>();

  const {
    data: group,
    refetch,
    isRefetching,
    isLoading,
  } = useGroup(params.groupId);

  const { mutate: join, isPending: isJoining } = useJoinGroup(params.groupId);
  const { mutate: leave, isPending: isLeaving } = useLeaveGroup(params.groupId);

  const goToEditGroup = React.useCallback(
    () => navigate('edit-group', { groupId: params.groupId }),
    [navigate, params.groupId],
  );

  const headerLeftButton = React.useCallback(
    (props: HeaderBackButtonProps) => (
      <HeaderBackButton {...props} onPress={goBack} />
    ),
    [goBack],
  );

  const headerRightButton = React.useCallback(
    ({ canGoBack }: HeaderButtonProps) => (
      <HeaderButton
        canGoBack={canGoBack}
        onPress={goToEditGroup}
        icon="md-pencil"
        shouldGoBack={false}
      />
    ),
    [goToEditGroup],
  );

  React.useLayoutEffect(() => {
    const rightButton = group?.is_owner ? headerRightButton : () => null;

    setOptions({
      headerTitle: group?.name || '',
      headerLeft: headerLeftButton,
      headerRight: rightButton,
    });
  }, [setOptions, group, headerLeftButton, headerRightButton]);

  const groupMembersAvatars = React.useMemo(
    () => group?.members.items.map(member => member.avatar_url) || [],
    [group],
  );

  const groupNotLoadedCorrectly = (
    <>
      <Text style={styles.groupNotLoadedText}>
        Щось пішло не так, спробуйте ще раз
      </Text>
      <Button label="Повторити" onPress={refetch} />
    </>
  );

  return (
    <ScrollView
      style={styles.scrollViewContainer}
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={
        <LoaderRefresh
          size={60}
          isRefreshing={isRefetching}
          onRefresh={refetch}
        />
      }>
      {isLoading ? (
        <Loader size={'large'} />
      ) : !group ? (
        groupNotLoadedCorrectly
      ) : (
        <>
          <FastImageProgress
            source={
              group.avatar?.url ? { uri: group.avatar.url } : defaultGroupImage
            }
            style={styles.image}
          />
          <Text style={styles.groupPrivacyType}>
            {group.privacyCodeLabel} група
          </Text>
          <GroupMembers
            membersCount={group.members.items.length}
            avatars={groupMembersAvatars}
            isJoined={Boolean(group.is_member)}
          />
          {!group.is_owner && (
            <Button
              label={group.is_member ? 'Вийти' : 'Приєднатися'}
              style={styles.joinButton}
              backgroundColor={group.is_member ? colors.red : colors.primary}
              loading={isJoining || isLeaving}
              onPress={() =>
                group.is_member
                  ? leave({ group_id: group.id, user_id: userId })
                  : join({ group_id: group.id, user_id: userId })
              }
            />
          )}
        </>
      )}
    </ScrollView>
  );
};

export default GroupView;
