/**
 * @namespace AvatarGroup
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { AvatarGroupProps } from './types';
import { Text, View } from 'react-native';
import { generalStyles } from '@styles';
import { FastImageProgress } from '@components';

const defaultImage = require('../../../assets/images/marker.jpg');

/**
 * AvatarGroup
 *
 * @memberof
 * @param {AvatarGroupProps} params
 *
 * @example
 * // How to use AvatarGroup:
 *  <AvatarGroup avatars={["uri", "uri"]} numberOfShowedAvatars={3} />
 */
const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  numberOfShowedAvatars = 5,
}) => {
  const styles = useStyles();

  const numberOfAllAvatars = avatars.length;

  const showedAvatars = React.useMemo(
    () => avatars.slice(0, numberOfShowedAvatars),
    [avatars, numberOfShowedAvatars],
  );

  const numberOfHiddenAvatars = React.useMemo(
    () =>
      numberOfShowedAvatars > numberOfAllAvatars
        ? 0
        : numberOfAllAvatars - numberOfShowedAvatars,
    [numberOfAllAvatars, numberOfShowedAvatars],
  );

  return (
    <View style={generalStyles.row}>
      {showedAvatars.map((uri, index) => {
        const isFirst = index === 0;

        return (
          <View
            key={uri + index}
            style={[
              styles.avatarContainer,
              // eslint-disable-next-line
              { marginLeft: isFirst ? 0 : -8, zIndex: index },
            ]}>
            <FastImageProgress
              defaultSource={defaultImage}
              source={{ uri }}
              style={styles.avatar}
            />
          </View>
        );
      })}
      {Boolean(numberOfHiddenAvatars) && (
        <View
          style={[
            styles.avatarContainer,
            // eslint-disable-next-line
            { marginLeft: -8, zIndex: numberOfShowedAvatars + 1 },
          ]}>
          <Text style={styles.numberOfShowedAvatars}>
            +{numberOfHiddenAvatars}
          </Text>
        </View>
      )}
    </View>
  );
};

export default AvatarGroup;
