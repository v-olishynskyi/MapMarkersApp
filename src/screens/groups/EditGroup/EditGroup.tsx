import React from 'react';
import { AppStackParamsList, GroupsStackParamsList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HeaderButton, Loader } from '@components';
import { getTheme } from '@common/helpers';
import { useGroup } from '@api/hooks/groups';
import { Text } from 'react-native';

const EditGroup: React.FC = () => {
  const { colors } = getTheme();
  const { setOptions } =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();
  const { params } = useRoute<RouteProp<GroupsStackParamsList, 'edit-group'>>();

  const { data: group, isFetching } = useGroup(params.groupId);

  const headerLeftButton = React.useCallback(
    ({ canGoBack }: { canGoBack: boolean }) => (
      <HeaderButton
        canGoBack={canGoBack}
        color={colors.red}
        label={'Відмінити'}
      />
    ),
    [colors.red],
  );
  const headerRightButton = React.useCallback(
    ({ canGoBack }: { canGoBack: boolean }) => (
      <HeaderButton
        canGoBack={canGoBack}
        color={colors.primary}
        label={'Зберегти'}
        loading={false}
        onPress={async () => {}}
        backRoute={'map'}
        disabled={false}
      />
    ),
    [colors.primary],
  );

  React.useLayoutEffect(() => {
    setOptions({
      headerLeft: headerLeftButton,
      headerRight: headerRightButton,
    });
  }, [setOptions, headerLeftButton, headerRightButton]);

  if (isFetching) {
    return <Loader />;
  }

  return <Text style={{ color: 'white' }}>{JSON.stringify(group)}</Text>;
};

export default EditGroup;
