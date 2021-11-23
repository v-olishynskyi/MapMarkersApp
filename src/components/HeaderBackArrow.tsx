import * as React from 'react';
import { View } from 'react-native';
import { Icon, IconProps } from 'react-native-elements';

const BackArrow = (props?: IconProps) => {
  return (
    <View style={{ marginLeft: 16 }}>
      <Icon
        tvParallaxProperties={undefined}
        name="arrow-left"
        type="font-awesome-5"
        size={20}
        {...props}
      />
    </View>
  );
};

export default BackArrow;
