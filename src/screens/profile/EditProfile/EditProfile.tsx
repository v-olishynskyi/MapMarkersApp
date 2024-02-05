/**
 * @namespace EditProfile
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { useStores } from '@store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { HeaderButton, Input, Toast } from '@components';
import { observer } from 'mobx-react-lite';
import { getTheme } from '@common/helpers';
import { useFormik } from 'formik';
import { FormState } from './types';
import { useNavigation } from '@react-navigation/native';
import schema from './schema';
import { useUpdateProfile } from '@api/hooks/profile';

/**
 * EditProfile
 *
 *
 * @memberof Profile
 * @example
 * // How to use EditProfile:
 *  <EditProfile />
 */
const EditProfile: React.FC = () => {
  const { setOptions } = useNavigation();
  const styles = useStyles();
  const { colors } = getTheme();

  const {
    userStore: { user },
  } = useStores();

  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  const onSubmit = async (values: FormState) => {
    try {
      await updateProfile(values);
    } catch (error) {}
  };

  const { values, setFieldValue, handleSubmit, errors, isValid } =
    useFormik<FormState>({
      initialValues: {
        first_name: user.first_name,
        last_name: user.last_name,
        middle_name: user.middle_name,
        username: user.middle_name,
      },
      onSubmit,
      validationSchema: schema,
      validateOnMount: true,
    });

  const headerLeftButton = React.useCallback(
    ({ canGoBack }: { canGoBack: boolean }) => (
      <HeaderButton
        canGoBack={canGoBack}
        color={colors.red}
        label={'Відмінити'}
        backRoute={'profile-view'}
      />
    ),
    [colors.red],
  );
  const headerRightButton = React.useCallback(
    ({ canGoBack }: { canGoBack: boolean }) => (
      <HeaderButton
        canGoBack={canGoBack}
        color={colors.primary}
        label={'Зберегти'}
        loading={isPending}
        onPress={handleSubmit}
        backRoute={'profile-view'}
        disabled={!isValid}
      />
    ),
    [colors.primary, handleSubmit, isPending, isValid],
  );

  React.useEffect(() => {
    setOptions({
      headerLeft: headerLeftButton,
      headerRight: headerRightButton,
    });
  }, [setOptions, headerLeftButton, headerRightButton]);

  const inputs: Array<{ caption: string; field: keyof FormState }> = [
    { caption: 'Імʼя', field: 'first_name' },
    { caption: 'Прізвище', field: 'last_name' },
    { caption: 'По-батькові', field: 'middle_name' },
    { caption: 'Імʼя користувача', field: 'username' },
  ];

  return (
    <>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}>
        {inputs.map(el => (
          <Input
            key={el.field}
            caption={el.caption}
            value={values[el.field] || ''}
            error={errors[el.field]}
            onChangeText={value => setFieldValue(el.field, value)}
            style={styles.inputContainer}
            inputStyle={styles.input}
          />
        ))}
      </KeyboardAwareScrollView>
      <Toast />
    </>
  );
};

export default observer(EditProfile);
