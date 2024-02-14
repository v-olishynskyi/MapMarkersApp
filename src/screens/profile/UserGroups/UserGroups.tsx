import React from 'react';
import { LoaderRefresh } from '@components';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParamsList } from '@navigation';
import { ScrollView } from 'react-native';
import { useAllGroups } from '@api/hooks/groups';
import { useStores } from '@store';
import { GroupsFilterBy } from '@services/groups';
import useStyles from './styles';
import { GroupsListSection } from './components';

const UserGroups = () => {
  const styles = useStyles();
  const { params } = useRoute<RouteProp<AppStackParamsList, 'user-groups'>>();
  const {
    userStore: { user },
  } = useStores();

  const isMe = params.userId === user.id;

  const {
    data: groups,
    isLoading,
    refetch,
  } = useAllGroups({
    filter_by: isMe ? GroupsFilterBy.My_Groups : GroupsFilterBy.By_User,
    user_id: isMe ? undefined : params.userId,
  });

  const ownGroups = groups?.filter(group => group.owner_id === user.id) || [];
  const memberGroups =
    groups?.filter(group => group.owner_id !== user.id) || [];

  return (
    <ScrollView
      refreshControl={
        <LoaderRefresh onRefresh={refetch} isRefreshing={isLoading} />
      }
      style={styles.listContainer}
      contentContainerStyle={styles.contentContainer}>
      <GroupsListSection
        groups={ownGroups}
        title="Групи, якими ви керуєте"
        listEmptyComponents={<></>}
      />
      <GroupsListSection
        groups={memberGroups}
        title="Групи, у яких ви учасник"
        listEmptyComponents={<></>}
      />
    </ScrollView>
  );
};

export default UserGroups;
