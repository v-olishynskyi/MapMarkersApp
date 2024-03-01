/**
 * @namespace MarkerItem
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { MarkerItemProps } from './types';
import { FastImageProgress, Pressable, UserItem } from '@components';
import { generalStyles } from '@styles';
import { Text, View } from 'react-native';

const defaultMarkerImage = require('../../../../../assets/images/marker.jpg');

/**
 * MarkerItem
 *
 * @memberof
 * @param {MarkerItemProps} params
 *
 * @example
 * // How to use MarkerItem:
 *  <MarkerItem marker={markerModel} onPress={() => { doSomething() }} />
 */
const MarkerItem: React.FC<MarkerItemProps> = ({ marker, onPress, style }) => {
  const styles = useStyles();

  return (
    <Pressable
      style={[generalStyles.row, styles.container, style]}
      onPress={onPress}>
      <FastImageProgress
        style={styles.image}
        source={{ uri: marker.images?.items[0]?.url }}
        defaultSource={defaultMarkerImage}
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {marker.name}
        </Text>
        {!!marker.description && (
          <Text style={styles.description} numberOfLines={1}>
            {marker.description}
          </Text>
        )}
        <UserItem user={marker.author} size="small" style={styles.userCard} />
      </View>
    </Pressable>
  );
};

export default React.memo(MarkerItem);
