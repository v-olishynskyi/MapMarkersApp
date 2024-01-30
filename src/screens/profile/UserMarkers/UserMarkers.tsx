import React from 'react';
import { observer } from 'mobx-react-lite';
import { BaseList } from '@components';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParamsList } from '@navigation';

const UserMarkers = () => {
  const { params } = useRoute<RouteProp<AppStackParamsList, 'user-markers'>>();
  console.log('UserMarkers - params:', params.userId);

  return (
    <BaseList
      data={[]}
      renderItem={() => null}
      isLoading={false}
      onRefresh={() => {}}
    />
  );
};

export default observer(UserMarkers);
