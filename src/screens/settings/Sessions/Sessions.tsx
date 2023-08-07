/**
 * @namespace Sessions
 * @category Screens
 * @subcategory Settings subscreens
 */
import React, { useLayoutEffect, useRef } from 'react';
import { ScrollView, Text } from 'react-native';
import useStyles from './styles';
import { useStores } from '@store';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from '@components';
import { UserSessionModel } from '@models';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { SessionItem } from './components';

/**
 * Sessions
 *
 * @memberof Screens
 *
 * @example
 * // How to use Sessions:
 *  <Sessions />
 */
const Sessions: React.FC = () => {
  const styles = useStyles();
  const { setOptions } = useNavigation();
  const {
    userStore: {
      user: { sessions },
    },
  } = useStores();

  const [isEditMode, setIsEditMode] = React.useState(false);

  const refs = useRef<Array<Swipeable>>([]);

  useLayoutEffect(() => {
    setOptions({
      headerRight: props => (
        <Pressable
          onPress={() => {
            setIsEditMode(prev => !prev);
          }}>
          <Text style={{ color: props.tintColor }}>Змінити</Text>
        </Pressable>
      ),
    });
  }, [setOptions]);

  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.rectButton} onPress={() => {}}>
        <Animated.Text
          style={[
            {
              // transform: [{ translateX: trans }],
            },
          ]}>
          Archive
        </Animated.Text>
      </RectButton>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {sessions.map((item: UserSessionModel, index: number) => {
        return (
          <SessionItem
            onSetRef={ref => (refs[index] = ref)}
            key={item.id}
            session={item}
            isEditMode={isEditMode}
            onDelete={async () => {}}
            onPress={() => {}}
          />
        );
      })}
    </ScrollView>
  );
};

export default Sessions;
