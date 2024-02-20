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
import { HeaderButton, Input, Pressable, Switch } from '@components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { EditableMarkerImages } from './components';
import { CreateMarkerData } from '@services/markers';
import { Toast } from '@components';
import { useCreateMarker, useUpdateMarker } from '@api/hooks/markers';
import { generalStyles, spacingBase } from '@styles';

const MarkerManagement: React.FC = () => {
  const { params } = useRoute<RouteType>();
  const { setOptions, addListener, removeListener, dispatch, navigate } =
    useNavigation<NavigationType>();
  const { colors } = getTheme();
  const styles = useStyles();

  const isCreateMode = params.mode === MarkerManagementModes.CREATE;
  const headerTitle = isCreateMode ? 'Створення' : 'Редагування';

  const {
    userStore: {
      user: { id },
    },
    markersStore: { editableMarker, clearEditableMarker, createDraftMarker },
  } = useStores();

  const { mutateAsync: createMarker, isPending: isCreatingMarker } =
    useCreateMarker();
  const { mutateAsync: updateMarker, isPending: isUpdatingMarker } =
    useUpdateMarker(editableMarker?.id || '');

  const isProcessing = isCreatingMarker || isUpdatingMarker;

  const shouldPreventGoBackRef = React.useRef<boolean>(true);
  const shouldPreventGoBackCauseErrorRef = React.useRef<boolean>(false);
  const hasSomeChangesRef = React.useRef<boolean>(false);

  const {
    values,
    setFieldValue,
    handleBlur,
    errors,
    validateForm,
    setFieldTouched,
    setErrors,
    isValid,
    dirty,
    touched,
  } = useFormik<FormState>({
    initialValues: {
      name: editableMarker?.name || '',
      description: editableMarker?.description || '',
      latitude: editableMarker?.latitude || 0,
      longitude: editableMarker?.longitude || 0,
      is_hidden: editableMarker?.is_hidden || false,
    },
    onSubmit: formValues => onSubmit(formValues),
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
      case 'is_hidden': {
        editableMarker?.setIsHidden(value);
        break;
      }
      default: {
      }
    }
  };

  const onSubmit: (values: FormState) => Promise<void> = React.useCallback(
    async v => {
      const { description, latitude, longitude, name, is_hidden } = v;

      try {
        shouldPreventGoBackRef.current = false;
        if (!editableMarker) {
          return;
        }

        const validationErrors = await validateForm(v);
        if (Object.keys(validationErrors).length) {
          setErrors(validationErrors);
          return;
        }

        const markerData: CreateMarkerData['data'] = {
          name,
          description,
          latitude,
          longitude,
          author_id: id,
          is_draft: false,
          is_hidden,
        };

        const images = editableMarker.images.items;

        if (isCreateMode) {
          await createMarker({ data: markerData, images });
        } else {
          const newImagesId = images
            .filter(({ _is_new }) => _is_new)
            .map(({ id: imgId }) => imgId);

          await updateMarker({
            data: { ...markerData, images: newImagesId },
            images,
          });
        }
      } catch (error) {
        shouldPreventGoBackCauseErrorRef.current = true;
        shouldPreventGoBackRef.current = true;
      }
    },
    [
      createMarker,
      editableMarker,
      id,
      isCreateMode,
      updateMarker,
      setErrors,
      validateForm,
    ],
  );

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

  React.useEffect(() => {
    hasSomeChangesRef.current = dirty;
  }, [dirty]);

  React.useEffect(
    () => {
      const listener = addListener('beforeRemove', async e => {
        const onGoBack = () => {
          clearEditableMarker();
          dispatch(e.data.action);
        };

        const createDraftAndGoBack = async () => {
          await createDraftMarker(values);
          return onGoBack();
        };

        if (!hasSomeChangesRef.current) {
          return onGoBack();
        }

        if (shouldPreventGoBackCauseErrorRef.current) {
          shouldPreventGoBackCauseErrorRef.current = false;
          return e.preventDefault();
        }

        if (shouldPreventGoBackRef.current) {
          e.preventDefault();

          return Alert.alert(
            '',
            `Ви впевнені, що хочете перервати ${headerTitle.toLowerCase()}?`,
            [
              { text: `Продовжити ${headerTitle.toLowerCase()}` },
              {
                text: 'Зберегти як чернетку',
                style: 'destructive',
                isPreferred: true,
                onPress: createDraftAndGoBack,
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
            error={touched.name && errors.name}
          />
          <Input
            value={values.description}
            placeholder="Введіть опис маркеру"
            caption="Опис"
            onChangeText={handleChangeInput('description')}
            onFocus={() => setFieldTouched('description')}
            editable={!isProcessing}
            onBlur={handleBlur('description')}
            error={touched.description && errors.description}
            multiline
            inputStyle={styles.descriptionInput}
            showLength
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
          <View
            style={[generalStyles.rowBetween, { marginTop: spacingBase.s2 }]}>
            <Switch
              label="Прихований"
              value={values.is_hidden}
              onValueChange={handleChangeInput('is_hidden')}
            />
          </View>
        </View>
        <EditableMarkerImages />
      </KeyboardAwareScrollView>
      <Toast />
    </>
  );
};

export default observer(MarkerManagement);
