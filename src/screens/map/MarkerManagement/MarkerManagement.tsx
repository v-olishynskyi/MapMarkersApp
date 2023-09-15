import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import useStyles from './styles';
import { FormState } from './types';
import { validationSchema } from './schema';
import { useStores } from '@store';
import { Alert, View } from 'react-native';
import { getTheme } from '@common/helpers';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';
import {
  AppStackParamsList,
  MapStackParamsList,
  MarkerManagementModes,
} from '@navigation';
import { HeaderButton, Input, Pressable } from '@components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const MarkerManagement: React.FC = () => {
  const { params } =
    useRoute<RouteProp<MapStackParamsList, 'marker-management'>>();
  const {
    setOptions,
    addListener,
    removeListener,
    dispatch,
    navigate,
    popToTop,
    goBack,
  } =
    useNavigation<
      NativeStackNavigationProp<AppStackParamsList & MapStackParamsList>
    >();
  const { colors } = getTheme();
  const styles = useStyles();
  const isCreateMode = params.mode === MarkerManagementModes.CREATE;

  const {
    markersStore: {
      editableMarker,
      createMarker,
      isProcessing,
      clearEditableMarker,
    },
  } = useStores();

  const onSubmit: () => Promise<void> = React.useCallback(async () => {
    if (!editableMarker) {
      return;
    }

    const validationErrors = await validateForm(values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    await createMarker(editableMarker);
    //@ts-ignore
  }, [createMarker, editableMarker, setErrors, validateForm, values]);

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
      latitude: editableMarker?.latitude || 0,
      longitude: editableMarker?.longitude || 0,
    },
    onSubmit,
    validationSchema,
  });

  const handleChangeInput = (field: keyof FormState) => (value: any) => {
    setFieldValue(field, value);

    switch (field) {
      case 'latitude': {
        editableMarker?.setLatitude(value);
        break;
      }
      case 'longitude': {
        editableMarker?.setLongitude(value);
        break;
      }
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

  const headerLeftButton = React.useCallback(
    ({ canGoBack }: { canGoBack: boolean }) => (
      <HeaderButton
        canGoBack={canGoBack}
        color={colors.red}
        label={'Відмінити'}
        backRoute={'map'}
        onPress={() => {
          Alert.alert(
            'Підтвердження',
            'Ви впевнені, що хочете завершити створення?',
            [
              { text: 'Скасувати' },
              {
                text: 'Підтвердити',
                isPreferred: false,
                style: 'destructive',
                onPress: () => {
                  dispatch({ type: 'GO_BACK' });
                },
              },
            ],
          );
        }}
      />
    ),
    [colors.red, goBack],
  );
  const headerRightButton = React.useCallback(
    ({ canGoBack }: { canGoBack: boolean }) => (
      <HeaderButton
        canGoBack={canGoBack}
        color={colors.primary}
        label={isCreateMode ? 'Створити' : 'Зберегти'}
        loading={isProcessing}
        onPress={onSubmit}
        backRoute={'map'}
      />
    ),
    [colors.primary, isProcessing, onSubmit, isCreateMode],
  );

  const headerTitle = React.useMemo(
    () => (isCreateMode ? 'Створення' : 'Редагування'),
    [isCreateMode],
  );

  const mapIcon = (
    <Pressable
      onPress={() => {
        navigate('map-view');
      }}
      hitSlop={{ top: 20, bottom: 20 }}>
      <Icon
        name={'map'}
        style={styles.iconContainer}
        size={24}
        color={colors.primary}
      />
    </Pressable>
  );

  React.useLayoutEffect(() => {
    setOptions({
      headerLeft: headerLeftButton,
      headerRight: headerRightButton,
      headerTitle,
    });
  }, [setOptions, headerLeftButton, headerRightButton, headerTitle]);

  React.useEffect(() => {
    const listener = addListener('beforeRemove', e => {
      // e.preventDefault();
      // const onGoBack = () => {
      //   clearEditableMarker();
      //   dispatch(e.data.action);
      // };
      // return Alert.alert(
      //   'Підтвердження',
      //   'Ви впевнені, що хочете завершити створення?',
      //   [
      //     { text: 'Скасувати' },
      //     {
      //       text: 'Підтвердити',
      //       isPreferred: false,
      //       style: 'destructive',
      //       onPress: onGoBack,
      //     },
      //   ],
      // );
    });

    return () => removeListener('beforeRemove', listener);
  }, [addListener, removeListener, dispatch, clearEditableMarker]);

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.body}>
        <Input
          value={values.name}
          placeholder="Введіть імʼя маркеру"
          caption="Імʼя"
          onChangeText={handleChangeInput('name')}
          onFocus={() => setFieldTouched('name')}
          editable={!isProcessing}
          onBlur={handleBlur('name')}
          error={errors.name}
        />
        <Input
          value={values.description}
          placeholder="Введіть опис маркеру"
          caption="Опис"
          onChangeText={handleChangeInput('description')}
          onFocus={() => setFieldTouched('description')}
          editable={!isProcessing}
          onBlur={handleBlur('description')}
          error={errors.description}
          multiline
          inputStyle={styles.descriptionInput}
        />
        <Input
          value={editableMarker?.latitude.toString() || ''}
          caption="Широта"
          rightIcon={mapIcon}
        />
        <Input
          value={editableMarker?.longitude.toString() || ''}
          caption="Довгота"
          rightIcon={mapIcon}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default observer(MarkerManagement);
