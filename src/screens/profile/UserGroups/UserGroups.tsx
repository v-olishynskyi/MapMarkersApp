import React from 'react';
import { Button, HeaderButton, LoaderRefresh } from '@components';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppStackParamsList } from '@navigation';
import { ScrollView, Text, View } from 'react-native';
import { useAllGroups } from '@api/hooks/groups';
import { useStores } from '@store';
import { GroupsFilterBy } from '@services/groups';
import useStyles from './styles';
import { GroupsListSection } from './components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const UserGroups = () => {
  const styles = useStyles();
  const { params } = useRoute<RouteProp<AppStackParamsList, 'user-groups'>>();
  const { navigate, setOptions } =
    useNavigation<
      NativeStackNavigationProp<AppStackParamsList, 'tabs', 'tabs-navigator"'>
    >();
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

  const navigateToGroups = React.useCallback(
    () =>
      navigate('tabs', { screen: 'community-tab', params: { tab: 'groups' } }),
    [navigate],
  );

  const navigateToAddGroup = React.useCallback(
    () => navigate('create-group'),
    [navigate],
  );

  const ownGroups = groups?.filter(group => group.owner_id === user.id) || [];
  const memberGroups =
    groups?.filter(group => group.owner_id !== user.id) || [];

  const emptyOwnGroupsListComponent = React.useMemo(
    () => (
      <View style={styles.listEmptyComponentContainer}>
        <Text style={styles.listEmptyComponentTitle}>
          Ви можете створити власну групу
        </Text>
        <Button
          label="Створити групу"
          size="medium"
          style={styles.listEmptyComponentButton}
        />
      </View>
    ),
    [styles],
  );

  const HeaderRightButton = React.useCallback(
    () => (
      <HeaderButton
        icon="add"
        onPress={navigateToAddGroup}
        shouldGoBack={false}
      />
    ),
    [navigateToAddGroup],
  );

  React.useLayoutEffect(() => {
    setOptions({ headerRight: HeaderRightButton });
  }, [setOptions, HeaderRightButton]);

  const emptyUserGroupsListComponent = React.useMemo(
    () => (
      <View style={styles.listEmptyComponentContainer}>
        <Text style={styles.listEmptyComponentTitle}>
          {isMe
            ? 'Тут будуть відображатися групи до яких Ви приєдналися як учасник'
            : 'Тут будуть відображатися групи до яких користувач приєднався як учасник'}
        </Text>
        {isMe && (
          <Button
            label="Переглянути усі групи"
            size="medium"
            style={styles.listEmptyComponentButton}
            onPress={navigateToGroups}
          />
        )}
      </View>
    ),
    [styles, isMe, navigateToGroups],
  );

  return (
    <ScrollView
      refreshControl={
        <LoaderRefresh onRefresh={refetch} isRefreshing={isLoading} />
      }
      style={styles.listContainer}
      contentContainerStyle={styles.contentContainer}>
      {isMe && (
        <GroupsListSection
          groups={ownGroups}
          title="Групи, якими ви керуєте"
          listEmptyComponents={emptyOwnGroupsListComponent}
        />
      )}
      <GroupsListSection
        groups={memberGroups}
        title={isMe ? 'Групи, до яких ви приєдналися' : ''}
        listEmptyComponents={emptyUserGroupsListComponent}
      />
    </ScrollView>
  );
};

export default UserGroups;
