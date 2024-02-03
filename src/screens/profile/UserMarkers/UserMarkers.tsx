import React from 'react';
import { BaseList } from '@components';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParamsList } from '@navigation';
import { useMarkersByUser } from '@api/hooks/markers';
import { Text, View } from 'react-native';
import { generalStyles } from '@styles';

const UserMarkers = () => {
  const { params } = useRoute<RouteProp<AppStackParamsList, 'user-markers'>>();

  const {
    data: markers,
    isFetching,
    refetch,
  } = useMarkersByUser(params.userId);

  return (
    <BaseList
      data={markers}
      renderItem={({ item }) => (
        <View style={[generalStyles.rowBetween]}>
          <Text style={{ color: 'white' }}>{item.name}</Text>
        </View>
      )}
      isLoading={isFetching}
      onRefresh={refetch}
    />
  );
};

export default UserMarkers;
