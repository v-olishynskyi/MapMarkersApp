/**
 * @namespace MarkerBottomSheet
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import { MarkerContent } from './components';

/**
 * MarkerBottomSheet
 *
 * @example
 * // How to use MarkerBottomSheet:
 *  <MarkerBottomSheet />
 */
const MarkerBottomSheet: React.FC = () => {
  const styles = useStyles();
  const {
    markersStore: { clearActiveMarker, activeMarkerId },
  } = useStores();

  const sheetRef = React.useRef<BottomSheetModal>(null);

  const snapPoints = React.useMemo(() => ['15%', '50%', '95%'], []);

  const openModal = React.useCallback(() => sheetRef.current?.present(), []);
  const closeModal = React.useCallback(() => sheetRef.current?.dismiss(), []);
  const onDismiss = React.useCallback(clearActiveMarker, [clearActiveMarker]);

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={2}
        disappearsOnIndex={1}
        pressBehavior={'collapse'}
      />
    ),
    [],
  );

  React.useEffect(
    () => (activeMarkerId ? openModal() : closeModal()),
    [activeMarkerId, closeModal, openModal],
  );

  return (
    <BottomSheetModal
      ref={sheetRef}
      index={1}
      snapPoints={snapPoints}
      onDismiss={onDismiss}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}>
      <MarkerContent onClose={closeModal} />
    </BottomSheetModal>
  );
};

export default observer(MarkerBottomSheet);
