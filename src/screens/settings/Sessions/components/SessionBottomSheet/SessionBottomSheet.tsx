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
import { Button, Menu, Pressable } from '@components';
import Icon from 'react-native-vector-icons/Ionicons';
import { getTheme } from '@common/helpers';
import terminateConfirmationRequest from '../../terminateConfirmationRequest';
import { PlatformIcon } from '../';
import { getVersion } from 'react-native-device-info';

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
    authStore: { currentSession },
  } = useStores();

  const sheetRef = React.useRef<BottomSheetModal>(null);

  const snapPoints = React.useMemo(() => ['50%', '85%'], []);

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
          <PlatformIcon size="large" platform={session.device.platform} />
          <Text style={styles.deviceName}>{session.device.name}</Text>
          <Menu
            items={[
              {
                label: 'Застосунок',
                secondaryLabel: `Markers ${getVersion()}`,
              },
              // {
              //   label: 'IP-адреса',
              //   secondaryLabel: session.ip?.toString(),
              // },
              // {
              //   label: 'Розташування',
              //   secondaryLabel: session.location?.toString(),
              // },
            ]}
          />
          {currentSession?.id !== session.id && (
            <Button
              label="Завершити сеанс"
              backgroundColor={colors.card}
              color={colors.red}
              style={styles.terminateSessionButton}
              loading={isTerminatingSession}
              onPress={handleTerminateSession}
            />
          )}
        </BottomSheetScrollView>
      </>
    );
    /* eslint eslint-comments/no-unlimited-disable: */
    // eslint-disable-next-line
  }, [session, terminateSession, isTerminatingSession]);

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const onDismiss = React.useCallback(() => setSession(null), [setSession]);

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
      index={1}
      snapPoints={snapPoints}
      onDismiss={onDismiss}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}>
      {content}
    </BottomSheetModal>
  );
};

export default observer(SessionBottomSheet);
