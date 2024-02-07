import React from 'react';
import { View } from 'react-native';
import { generalStyles, spacingBase } from '@styles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import useStyles from './styles';
import { getTheme } from '@common/helpers';

const Skeleton: React.FC = () => {
  const styles = useStyles();
  const { colors } = getTheme();

  return (
    <SkeletonPlaceholder backgroundColor={colors.card}>
      <View style={[generalStyles.row, styles.container]}>
        <SkeletonPlaceholder.Item
          borderRadius={100}
          width={40}
          height={40}
          marginRight={spacingBase.s2}
        />
        <View style={styles.content}>
          <SkeletonPlaceholder.Item height={16} />
          <SkeletonPlaceholder.Item height={16} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default Skeleton;
