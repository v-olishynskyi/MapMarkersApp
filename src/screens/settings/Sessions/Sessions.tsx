/**
 * @namespace Sessions
 * @category Screens
 * @subcategory Settings subscreens
 */
import React, { useLayoutEffect, useRef } from 'react';
import { ActionSheetIOS, Alert, ScrollView, Text } from 'react-native';
import useStyles from './styles';
import { useStores } from '@store';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from '@components';
import { SessionItem } from './components';
import { SwipeableItemHandler } from './components/SessionItem/types';
import { IS_IOS } from '@common/helpers';
import { observer } from 'mobx-react-lite';

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
      if (IS_IOS) {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ['Скасувати', 'Завершити сеанс'],
            destructiveButtonIndex: 1,
            cancelButtonIndex: 0,
            message: 'Ви дійсно хочете завершити сеанс на данному пристрої?',
          },
          index => {
            if (index === 0) {
              return;
            }

            terminateSession(sessionId);
          },
        );
      } else {
        Alert.alert();
      }
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
          <Text style={{ color: props.tintColor }}>
            {isEditMode ? 'Готово' : 'Змінити'}
          </Text>
        </Pressable>
      ),
    });
  }, [setOptions, isEditMode, closeAllSwipers]);

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
              onPress={() => {}}
              onPressMinus={() => {
                closeAllSwipers();
                refs.current[index].openRight();
              }}
            />
          );
        })}
      </ScrollView>
    </>
  );
};

export default observer(Sessions);
