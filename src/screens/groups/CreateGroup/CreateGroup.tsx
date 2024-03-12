import React from 'react';
import { View } from 'react-native';
import { AppStackParamsList } from '@navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HeaderButton } from '@components';
import { getTheme, wait } from '@common/helpers';
import { GroupForm } from '../components';
import { PublicFileModel } from '@models';
import { FormState } from '../components/GroupForm/types';
import validationSchema from '../components/GroupForm/schema';
import useStyles from './styles';
import { useFormik } from 'formik';
import { GroupPrivacyCodes } from '@common/types';
import { useCreateGroup } from '@api/hooks/groups';

const CreateGroup: React.FC = () => {
  const styles = useStyles();
  const { colors } = getTheme();
  const { setOptions } =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();

  const [avatar, setAvatar] = React.useState<PublicFileModel | null>(null);

  const { mutateAsync: createGroup, isPending } = useCreateGroup();

  const formik = useFormik<FormState>({
    initialValues: {
      name: '',
      description: '',
      privacyCode: GroupPrivacyCodes.PUBLIC,
    },
    onSubmit: async dataValues => await onCreateGroup(dataValues),
    validationSchema,
  });

  const onCreateGroup: (values: FormState) => Promise<void> = React.useCallback(
    async (values: FormState) => {
      try {
        const errors = await formik.validateForm(values);

        if (Object.entries(errors).length) {
          return;
        }

        await createGroup({
          data: {
            name: values.name,
            description: values.description,
            privacy_code: values.privacyCode,
          },
          avatar,
        });
      } catch (error) {}
    },
    [formik, createGroup, avatar],
  );

  const headerLeftButton = React.useCallback(
    ({ canGoBack }: { canGoBack: boolean }) => (
      <HeaderButton
        canGoBack={canGoBack}
        color={colors.red}
        label={'Відмінити'}
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
        onPress={() => onCreateGroup(formik.values)}
        backRoute={''}
        disabled={false}
      />
    ),
    [colors.primary, onCreateGroup, formik.values, isPending],
  );

  React.useLayoutEffect(() => {
    setOptions({
      headerLeft: headerLeftButton,
      headerRight: headerRightButton,
    });
  }, [setOptions, headerLeftButton, headerRightButton]);

  return (
    <View style={styles.container}>
      <GroupForm avatar={avatar} setAvatar={setAvatar} formik={formik} />
    </View>
  );
};

export default CreateGroup;
