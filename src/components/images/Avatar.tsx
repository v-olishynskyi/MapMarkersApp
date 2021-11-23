import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, AvatarProps } from 'react-native-elements';

interface AvatarImageProps {
  title?: string;
  uri: string;
}

const AvatarImage = (props: AvatarImageProps & AvatarProps) => {
  return (
    <Avatar
      {...props}
      rounded
      title={props.title}
      titleStyle={{ color: '#fff' }}
      containerStyle={{ backgroundColor: 'gray' }}
      source={{ uri: props.uri }}
    />
  );
};

export default AvatarImage;

const styles = StyleSheet.create({
  container: {},
});
