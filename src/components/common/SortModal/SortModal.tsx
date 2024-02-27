/**
 * @namespace SortModal
 * @category
 * @subcategory
 *  */
import React from 'react';
import { View } from 'react-native';
import useStyles from './styles';
import { SortModalProps, SortModalRef } from './types';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { generalStyles, spacingBase } from '@styles';
import RadioGroup from 'react-native-ui-lib/radioGroup';
import RadioButton from 'react-native-ui-lib/radioButton';
import { IconButton } from '@components';

/**
 * SortModal
 *
 * @memberof
 * @param {SortModalProps} params
 *
 * @example
 * // How to use SortModal:
 *  <SortModal
 *    ref={sortModalRef}
 *    sortOptions={[{sort_by: 'name', direction: 'asc', label: 'Імʼя'}]}
 *    sortIndex={sortIndex}
 *    setSortIndex={setSortIndex}
 * />
 */
const SortModal = React.forwardRef<SortModalRef, SortModalProps>(
  ({ sortOptions, sortIndex, setSortIndex }, ref) => {
    const styles = useStyles();

    const sheetRef = React.useRef<BottomSheetModal>(null);

    const closeModal = () => sheetRef.current?.dismiss();

    const renderBackdrop = React.useCallback(
      (bottomSheetBackdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...bottomSheetBackdropProps}
          appearsOnIndex={2}
          disappearsOnIndex={1}
          pressBehavior={'collapse'}
        />
      ),
      [],
    );

    React.useImperativeHandle(ref, () => ({
      close: closeModal,
      open: () => sheetRef.current?.present(),
    }));

    return (
      <BottomSheetModal
        ref={sheetRef}
        index={0}
        snapPoints={[250]}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.handleIndicator}>
        <BottomSheetView style={styles.sheetContent}>
          <View
            style={[generalStyles.rowEnd, { marginBottom: spacingBase.s3 }]}>
            <IconButton icon="close" onPress={closeModal} />
          </View>
          <RadioGroup initialValue={sortIndex} onValueChange={setSortIndex}>
            {sortOptions.map((sortItem, index) => (
              <RadioButton
                value={index}
                key={sortItem.sort_by + sortItem.direction}
                label={sortItem.label}
                contentOnLeft
                containerStyle={styles.radioButtonContainer}
                labelStyle={styles.radioButtonLabel}
              />
            ))}
          </RadioGroup>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default SortModal;
declare type SortModal = SortModalRef;
