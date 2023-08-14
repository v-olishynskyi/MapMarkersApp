/**
 * @namespace Sessions
 * @category Screens
 * @subcategory Settings subscreens
 */
import React from 'react';
import { ListRenderItem, Text } from 'react-native';
import useStyles from './styles';
import { useStores } from '@store';
import { useNavigation } from '@react-navigation/native';
import { BaseList, Pressable } from '@components';
import { SessionBottomSheet, SessionItem } from './components';
import { SwipeableItemHandler } from './components/SessionItem/types';
import { observer } from 'mobx-react-lite';
import terminateConfirmationRequest from './terminateConfirmationRequest';
import { UserSessionModel } from '@models';

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
      loadProfile,
      isLoading,
    },
    userSessionSheetStore: { setSession },
    authStore: { currentSession },
  } = useStores();

  const [isEditMode, setIsEditMode] = React.useState(false);

  const refs = React.useRef<Array<SwipeableItemHandler>>([]);

  const closeAllSwipers = React.useCallback(() => {
    for (const ref of refs.current) {
      ref.close();
    }
  }, [refs]);

  const onDeleteSession = React.useCallback(
    async (sessionId: string) => {
      closeAllSwipers();

      terminateConfirmationRequest(() => terminateSession(sessionId));
    },
    [closeAllSwipers, terminateSession],
  );

  const renderSession: ListRenderItem<UserSessionModel> = React.useCallback(
    ({ item, index }) => {
      const isCurrentSession = currentSession?.id === item.id;

      return (
        <SessionItem
          key={item.id}
          ref={ref => {
            refs.current[index] = ref!;
          }}
          session={item}
          isEditMode={isEditMode}
          onDelete={onDeleteSession}
          onPress={() => setSession(item)}
          onPressMinus={() => {
            closeAllSwipers();
            refs.current[index].openRight();
          }}
          enableSwipeable={!isCurrentSession}
        />
      );
    },
    [closeAllSwipers, currentSession, isEditMode, onDeleteSession, setSession],
  );

  const renderHeaderRight = React.useCallback(
    props => (
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
    [closeAllSwipers, isEditMode, styles.headerRightText],
  );

  React.useLayoutEffect(() => {
    setOptions({
      headerRight: renderHeaderRight,
    });
  }, [setOptions, renderHeaderRight]);

  return (
    <>
      <BaseList
        data={sessions.items}
        renderItem={renderSession}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        onRefresh={loadProfile}
        isLoading={isLoading}
      />
      <SessionBottomSheet />
    </>
  );
};

export default observer(Sessions);
