import React from 'react';
import { observer } from 'mobx-react-lite';
import { BaseList } from '@components';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParamsList } from '@navigation';
import { useMarkersByUser } from '@api/hooks/markers';

const UserMarkers = () => {
  const { params } = useRoute<RouteProp<AppStackParamsList, 'user-markers'>>();
  console.log('UserMarkers - params:', params.userId);

  const { data } = useMarkersByUser(params.userId, {
    page: 1,
    limit: 20,
  });
  console.log('UserMarkers - data:', data);

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
