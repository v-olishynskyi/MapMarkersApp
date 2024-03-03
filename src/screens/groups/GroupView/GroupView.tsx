import { useGroup } from '@api/hooks/groups';
import { FastImageProgress, Loader, LoaderRefresh } from '@components';
import { GroupsStackParamsList } from '@navigation';
import {
  HeaderBackButton,
  HeaderBackButtonProps,
} from '@react-navigation/elements';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, Text } from 'react-native';
import useStyles from './styles';
import { GroupMembers } from './components';

const defaultGroupImage = require('../../../assets/images/group.jpeg');

const GroupView: React.FC = () => {
  const styles = useStyles();
  const { setOptions, goBack } =
    useNavigation<
      NativeStackNavigationProp<GroupsStackParamsList, 'edit-group'>
    >();
  const { params } = useRoute<RouteProp<GroupsStackParamsList, 'group-view'>>();

  const {
    data: group,
    refetch,
    isRefetching,
    isLoading,
  } = useGroup(params.groupId);

  const headerLeftButton = React.useCallback(
    (props: HeaderBackButtonProps) => (
      <HeaderBackButton {...props} onPress={goBack} />
    ),
    [goBack],
  );

  const test = [
    'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg',
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D',
    'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRim43FOsSU9F-TXSSABOeBOKxC2UPRthwJRA&usqp=CAU',
    'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg',
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D',
  ];

  React.useLayoutEffect(() => {
    setOptions({
      headerTitle: group?.name || '',
      headerLeft: headerLeftButton,
    });
  }, [setOptions, group, headerLeftButton]);

  const groupMembersAvatars = React.useMemo(
    () => group?.members.items.map(member => member.avatar_url) || [],
    [group],
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
      ) : (
        <>
          <FastImageProgress
            source={
              group?.avatar?.url ? { uri: group.avatar.url } : defaultGroupImage
            }
            style={styles.image}
          />
          <Text style={styles.groupPrivacyType}>
            {group?.privacyCodeLabel} група
          </Text>
          <GroupMembers
            membersCount={group?.members.items.length as number}
            avatars={groupMembersAvatars}
          />
        </>
      )}
    </ScrollView>
  );
};

export default GroupView;
