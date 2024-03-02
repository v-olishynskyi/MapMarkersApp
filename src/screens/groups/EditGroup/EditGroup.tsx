import React from 'react';
import { AppStackParamsList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HeaderButton } from '@components';
import { getTheme } from '@common/helpers';
import { useGroup } from '@api/hooks/groups';

const EditGroup: React.FC = () => {
  const { colors } = getTheme();
  const { setOptions } =
    useNavigation<
      NativeStackNavigationProp<AppStackParamsList, 'edit-group'>
    >();
  const { params } = useRoute<RouteProp<AppStackParamsList, 'edit-group'>>();

  const { data: group, isFetching } = useGroup(params.groupId);

  const headerLeftButton = React.useCallback(
    ({ canGoBack }: { canGoBack: boolean }) => (
      <HeaderButton
        canGoBack={canGoBack}
        color={colors.red}
        label={'Відмінити'}
        backRoute={''}
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

  return null;
};

export default EditGroup;
