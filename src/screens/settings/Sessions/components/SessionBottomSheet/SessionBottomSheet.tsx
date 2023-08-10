/**
 * @namespace SessionBottomSheet
 * @category Component
 * @subcategory Sessions screen component
 *  */
import React from 'react';
import useStyles from './styles';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { Text } from 'react-native';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import { Button, Pressable } from '@components';
import Icon from 'react-native-vector-icons/Ionicons';
import { getTheme } from '@common/helpers';
import terminateConfirmationRequest from '../../terminateConfirmationRequest';

/**
 * SessionBottomSheet
 *
 * @param {SessionBottomSheetProps} params
 *
 * @example
 * // How to use SessionBottomSheet:
 *  <SessionBottomSheet />
 */
const SessionBottomSheet: React.FC = () => {
  const { colors } = getTheme();
  const styles = useStyles();

  const {
    userSessionSheetStore: { session, setSession },
    userStore: { terminateSession, isTerminatingSession },
  } = useStores();

  const sheetRef = React.useRef<BottomSheetModal>(null);

  const snapPoints = React.useMemo(() => ['25%', '50%', '85%'], []);

  const closeModal = React.useCallback(() => sheetRef.current?.dismiss(), []);
  const handleTerminateSession = React.useCallback(async () => {
    terminateConfirmationRequest(async () => {
      await terminateSession(session!.id);
      closeModal();
    });
  }, [session, terminateSession, closeModal]);

  const content = React.useMemo(() => {
    if (!session) {
      return null;
    }

    return (
      <>
        <Pressable style={styles.closeButtonContainer} onPress={closeModal}>
          <Icon name="close" size={20} color={colors.black} />
        </Pressable>
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <>
            <Text>{session.id}</Text>
            <Text>{session.device}</Text>
            <Text>{session.created_at.toString()}</Text>
            <Text>{session.updated_at.toString()}</Text>
          </>
          <Button
            label="Завершити сеанс"
            backgroundColor={colors.card}
            color={colors.red}
            style={styles.terminateSessionButton}
            loading={isTerminatingSession}
            onPress={handleTerminateSession}
          />
        </BottomSheetScrollView>
      </>
    );
    /* eslint eslint-comments/no-unlimited-disable: */
    // eslint-disable-next-line
  }, [session, terminateSession, isTerminatingSession]);

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} />,
    [],
  );

  React.useEffect(() => {
    if (session) {
      sheetRef.current?.present();
    } else {
      closeModal();
    }
  }, [session, closeModal]);

  return (
    <BottomSheetModal
      ref={sheetRef}
      index={2}
      snapPoints={snapPoints}
      onDismiss={() => setSession(null)}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}>
      {content}
    </BottomSheetModal>
  );
};

export default observer(SessionBottomSheet);
