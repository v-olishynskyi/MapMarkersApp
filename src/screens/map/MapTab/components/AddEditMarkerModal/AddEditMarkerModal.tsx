/**
 * @namespace AddEditMarkerModal
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { FormState } from './types';
import { validationSchema } from './schema';
import { useStores } from '@store';
import { Dialog } from 'react-native-ui-lib';
import { View, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Input, Pressable } from '@components';
import { getTheme } from '@common/helpers';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';

/**
 * AddEditMarkerModal
 *
 * @memberof
 *
 * @example
 * // How to use AddEditMarkerModal:
 *  <AddEditMarkerModal />
 */
const AddEditMarkerModal: React.FC = () => {
  const styles = useStyles();
  const { colors } = getTheme();
  const {
    markersStore: {
      editableMarker,
      createMarker,
      isProcessing,
      clearEditableMarker,
    },
  } = useStores();

  const onSubmit = async () => {
    if (!editableMarker) {
      return;
    }

    const validationErrors = await validateForm(values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    await createMarker(editableMarker);
  };

  const {
    values,
    setFieldValue,
    handleBlur,
    errors,
    validateForm,
    setFieldTouched,
    setErrors,
  } = useFormik<FormState>({
    initialValues: {
      name: editableMarker?.name || '',
      description: editableMarker?.description || '',
    },
    onSubmit: onSubmit,
    validationSchema,
  });

  const confirmAlert = React.useCallback(
    () =>
      Alert.alert(
        'Підтвердження',
        'Ви впевнені, що хочете завершити створення?',
        [
          { text: 'Скасувати' },
          {
            text: 'Підтвердити',
            isPreferred: false,
            style: 'destructive',
            onPress: clearEditableMarker,
          },
        ],
      ),
    [clearEditableMarker],
  );

  const handleChangeInput = (field: keyof FormState) => (value: string) => {
    setFieldValue(field, value);

    switch (field) {
      case 'name': {
        editableMarker?.setName(value);
        break;
      }
      case 'description': {
        editableMarker?.setDescription(value);
        break;
      }
    }
  };

  return (
    <Dialog
      useSafeArea
      center
      panDirection={undefined}
      containerStyle={styles.container}
      visible={!!editableMarker}
      onDismiss={confirmAlert}
      ignoreBackgroundPress
      overlayBackgroundColor={'rgba(0,0,0,.8)'}>
      <View style={styles.header}>
        <Text style={styles.title}>Новий маркер</Text>
        <Pressable onPress={confirmAlert}>
          <Icon name="close" size={24} color={colors.text} />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Input
          value={editableMarker?.latitude.toString() || ''}
          editable={false}
          caption="Широта"
        />
        <Input
          value={editableMarker?.longitude.toString() || ''}
          editable={false}
          caption="Довгота"
        />
        <Input
          value={values.name}
          placeholder="Імʼя"
          caption="Імʼя"
          onChangeText={handleChangeInput('name')}
          onFocus={() => setFieldTouched('name')}
          editable={!isProcessing}
          onBlur={handleBlur('name')}
          error={errors.name}
        />
        <Input
          value={values.description}
          placeholder="Опис"
          caption="Опис"
          onChangeText={handleChangeInput('description')}
          onFocus={() => setFieldTouched('description')}
          editable={!isProcessing}
          onBlur={handleBlur('description')}
          error={errors.description}
        />
      </View>
      <View style={styles.actions}>
        <Button
          label="Відміна"
          style={[styles.button, styles.mr1]}
          backgroundColor={colors.red}
          onPress={confirmAlert}
        />
        <Button
          label="Створити"
          style={styles.button}
          onPress={onSubmit}
          loading={isProcessing}
        />
      </View>
    </Dialog>
  );
};

export default observer(AddEditMarkerModal);
