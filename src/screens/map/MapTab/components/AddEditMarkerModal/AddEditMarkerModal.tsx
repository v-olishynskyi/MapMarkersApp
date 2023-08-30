/**
 * @namespace AddEditMarkerModal
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { AddEditMarkerModalProps } from './types';
import { useStores } from '@store';
import { Dialog } from 'react-native-ui-lib';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Input, Pressable } from '@components';
import { getTheme } from '@common/helpers';

/**
 * AddEditMarkerModal
 *
 * @memberof
 * @param {AddEditMarkerModalProps} params
 *
 * @example
 * // How to use AddEditMarkerModal:
 *  <AddEditMarkerModal />
 */
const AddEditMarkerModal: React.FC<AddEditMarkerModalProps> = () => {
  const styles = useStyles();
  const { colors } = getTheme();
  const {
    mapStore: { editableMarker },
  } = useStores();

  return !editableMarker ? null : (
    <Dialog
      useSafeArea
      center
      panDirection={Dialog.directions.DOWN}
      containerStyle={styles.container}
      visible
      onDismiss={() => {}}
      // renderPannableHeader={renderPannableHeader}
      // pannableHeaderProps={this.pannableTitle}
      // supportedOrientations={this.supportedOrientations}
      ignoreBackgroundPress>
      <View style={styles.header}>
        <Text style={styles.title}>Новий маркер</Text>
        <Pressable>
          <Icon name="close" size={24} color={colors.text} />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Input value={editableMarker.latitude.toString()} editable={false} />
        <Input value={editableMarker.longitude.toString()} editable={false} />
        <Input value={editableMarker.name} />
        <Input value={editableMarker.description || ''} />
      </View>
      <View style={styles.actions}>
        <Button
          label="Відміна"
          style={[styles.button, styles.mr1]}
          backgroundColor={colors.red}
        />
        <Button label="Створити" style={styles.button} />
      </View>
    </Dialog>
  );
};

export default AddEditMarkerModal;
