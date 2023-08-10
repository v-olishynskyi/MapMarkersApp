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
import { SessionBottomSheet, SessionItem } from './components';
import { SwipeableItemHandler } from './components/SessionItem/types';
import { observer } from 'mobx-react-lite';
import terminateConfirmationRequest from './terminateConfirmationRequest';

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
      terminateSession,
    },
    userSessionSheetStore: { setSession },
  } = useStores();

  const [isEditMode, setIsEditMode] = React.useState(false);

  const refs = useRef<Array<SwipeableItemHandler>>([]);

  const closeAllSwipers = React.useCallback(
    () =>
      sessions.items.forEach((_, index) => {
        refs.current[index].close();
      }),
    [refs, sessions],
  );

  const handlePressDeleteSession = React.useCallback(
    (sessionId: string) => {
      closeAllSwipers();

      terminateConfirmationRequest(() => terminateSession(sessionId));
    },
    [closeAllSwipers, terminateSession],
  );

  useLayoutEffect(() => {
    setOptions({
      headerRight: props => (
        <Pressable
          onPress={() => {
            closeAllSwipers();
            setIsEditMode(prev => !prev);
          }}>
          <Text style={(styles.headerRightText, { color: props.tintColor })}>
            {isEditMode ? 'Готово' : 'Змінити'}
          </Text>
        </Pressable>
      ),
    });
  }, [setOptions, isEditMode, closeAllSwipers, styles.headerRightText]);

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {sessions.items.map((item, index) => {
          return (
            <SessionItem
              key={item.id}
              ref={ref => {
                refs.current[index] = ref!;
              }}
              session={item}
              isEditMode={isEditMode}
              onDelete={async () => handlePressDeleteSession(item.id)}
              onPress={() => setSession(item)}
              onPressMinus={() => {
                closeAllSwipers();
                refs.current[index].openRight();
              }}
            />
          );
        })}
      </ScrollView>
      <SessionBottomSheet />
    </>
  );
};

export default observer(Sessions);
