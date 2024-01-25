import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import useStyles from './styles';
import { FormState, NavigationType, RouteType } from './types';
import { validationSchema } from './schema';
import { useStores } from '@store';
import { Alert, View } from 'react-native';
import { getTheme } from '@common/helpers';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';
import { MarkerManagementModes } from '@navigation';
import { HeaderButton, Input, Pressable } from '@components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { MarkerImages } from './components';
import { UpdateMarkerData } from '@services';
import { Toast } from '@components';

const MarkerManagement: React.FC = () => {
  const { params } = useRoute<RouteType>();
  const { setOptions, addListener, removeListener, dispatch, navigate } =
    useNavigation<NavigationType>();
  const { colors } = getTheme();
  const styles = useStyles();
  const isCreateMode = params.mode === MarkerManagementModes.CREATE;

  const {
    markersStore: {
      editableMarker,
      createMarker,
      updateMarker,
      isProcessing,
      clearEditableMarker,
      createDraftMarker,
    },
  } = useStores();

  const shouldPreventGoBack = React.useRef<boolean>(true);
  const shouldPreventGoBackCauseError = React.useRef<boolean>(false);

  const onSubmit: (values: FormState) => Promise<void> = React.useCallback(
    async values => {
      try {
        shouldPreventGoBack.current = false;
        if (!editableMarker) {
          return;
        }

        const validationErrors = await validateForm(values);
        if (Object.keys(validationErrors).length) {
          setErrors(validationErrors);
          return;
        }

        if (isCreateMode) {
          await createMarker(editableMarker);
        } else {
          const images = editableMarker.images.items.map(({ id }) => id);
          const data: UpdateMarkerData = {
            ...editableMarker,
            ...values,
            id: editableMarker.id,
            images,
          };

          await updateMarker(editableMarker.id, data);
        }
      } catch (error) {
        shouldPreventGoBackCauseError.current = true;
        shouldPreventGoBack.current = true;
      }
    },
    [
      //@ts-ignore
      setErrors,
      //@ts-ignore
      validateForm,
      createMarker,
      updateMarker,
      isCreateMode,
      editableMarker,
    ],
  );

  const {
    values,
    setFieldValue,
    handleBlur,
    errors,
    validateForm,
    setFieldTouched,
    setErrors,
    isValid,
  } = useFormik<FormState>({
    initialValues: {
      name: editableMarker?.name || '',
      description: editableMarker?.description || '',
      latitude: editableMarker?.latitude || 0,
      longitude: editableMarker?.longitude || 0,
    },
    onSubmit,
    validationSchema,
    isInitialValid: isCreateMode ? false : true,
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
      />
    ),
    [colors.red],
  );
  const headerRightButton = React.useCallback(
    ({ canGoBack }: { canGoBack: boolean }) => (
      <HeaderButton
        canGoBack={canGoBack}
        color={colors.primary}
        label={isCreateMode ? 'Створити' : 'Зберегти'}
        loading={isProcessing}
        onPress={async () => await onSubmit(values)}
        backRoute={'map'}
        disabled={!isValid}
      />
    ),
    [colors.primary, isProcessing, onSubmit, isCreateMode, isValid, values],
  );

  const headerTitle = isCreateMode ? 'Створення' : 'Редагування';

  const mapIcon = React.useMemo(
    () => (
      <Pressable
        onPress={() => {
          navigate('location');
        }}
        hitSlop={{ top: 20, bottom: 20 }}>
        <Icon
          name={'map'}
          style={styles.iconContainer}
          size={24}
          color={colors.primary}
        />
      </Pressable>
    ),
    [navigate, colors.primary, styles.iconContainer],
  );

  React.useLayoutEffect(() => {
    setOptions({
      headerLeft: headerLeftButton,
      headerRight: headerRightButton,
      headerTitle,
    });
  }, [setOptions, headerLeftButton, headerRightButton, headerTitle]);

  React.useEffect(
    () => {
      const listener = addListener('beforeRemove', async e => {
        const onGoBack = () => {
          clearEditableMarker();
          dispatch(e.data.action);
        };

        const onCreateDraftAndGoBack = async () => {
          await createDraftMarker(values);
          return onGoBack();
        };

        if (shouldPreventGoBackCauseError.current) {
          shouldPreventGoBackCauseError.current = false;
          return e.preventDefault();
        }

        if (shouldPreventGoBack.current) {
          e.preventDefault();

          return Alert.alert(
            '',
            `Ви впевнені, що хочете перервати ${headerTitle.toLowerCase()}?`,
            [
              { text: 'Продовжити' },
              {
                text: 'Зберегти як чернетку',
                style: 'destructive',
                isPreferred: true,
                onPress: onCreateDraftAndGoBack,
              },
              {
                text: 'Вийти',
                isPreferred: false,
                style: 'destructive',
                onPress: onGoBack,
              },
            ],
          );
        }
      });

      return () => removeListener('beforeRemove', listener);
    },
    // eslint-disable-next-line
    [],
  );

  return (
    <>
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

          <MarkerImages />
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
      <Toast />
    </>
  );
};

export default observer(MarkerManagement);
