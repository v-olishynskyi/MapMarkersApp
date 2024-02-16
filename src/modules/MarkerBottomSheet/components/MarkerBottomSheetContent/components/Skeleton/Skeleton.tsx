import React from 'react';
import { spacingBase } from '@styles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { getTheme } from '@common/helpers';

const Skeleton: React.FC = () => {
  const { colors } = getTheme();

  return (
    <SkeletonPlaceholder backgroundColor={colors.card}>
      <>
        <SkeletonPlaceholder.Item
          borderRadius={20}
          width={'70%'}
          height={18}
          marginBottom={spacingBase.s3}
        />
        <SkeletonPlaceholder.Item
          borderRadius={20}
          width={'100%'}
          height={16}
          marginBottom={spacingBase.s1}
        />
        <SkeletonPlaceholder.Item
          borderRadius={20}
          width={'100%'}
          height={16}
          marginBottom={spacingBase.s1}
        />
        <SkeletonPlaceholder.Item
          borderRadius={20}
          width={'100%'}
          height={16}
          marginBottom={spacingBase.s1}
        />
        <SkeletonPlaceholder.Item
          borderRadius={20}
          width={'100%'}
          height={16}
          marginBottom={spacingBase.s1}
        />
      </>
    </SkeletonPlaceholder>
  );
};

export default Skeleton;
