import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { CustomPressable } from '../buttons';

type MoreLessComponentProps = {
  fullText: string;
  lessText: string;
};

const MoreLessComponent = ({ fullText, lessText }: MoreLessComponentProps) => {
  const [more, setMore] = React.useState(false);
  return (
    <Text>
      {!more ? `${lessText}...` : fullText}
      <CustomPressable onPress={() => setMore(!more)}>
        <Text>{more ? 'Less' : 'More'}</Text>
      </CustomPressable>
    </Text>
  );
};

export default MoreLessComponent;

const styles = StyleSheet.create({
  container: {},
});
