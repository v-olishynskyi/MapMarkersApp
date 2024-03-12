import React from 'react';
import { View } from 'react-native';
import { AppStackParamsList } from '@navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HeaderButton, Loader } from '@components';
import { getTheme } from '@common/helpers';
import { useGroup } from '@api/hooks/groups';
import { GroupForm } from '../components';
import { PublicFileModel } from '@models';
import { FormState } from '../components/GroupForm/types';
import validationSchema from '../components/GroupForm/schema';
import useStyles from './styles';
import { useFormik } from 'formik';

const EditGroup: React.FC = () => {
  const styles = useStyles();
  const { colors } = getTheme();
  const { setOptions } =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();
  const { params } = useRoute<RouteProp<AppStackParamsList, 'edit-group'>>();

  const { data: group, isFetching } = useGroup(params.groupId);

  const [avatar, setAvatar] = React.useState<PublicFileModel | null>(
    group?.avatar || null,
  );

  const onSubmit = (values: FormState) => {
    console.log({ values });
  };

  const formik = useFormik<FormState>({
    initialValues: {
      name: group?.name || '',
      description: group?.description,
      privacyCode: group?.privacy_code as any,
    },
    onSubmit,
    validationSchema,
  });

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
        loading={false}
        onPress={formik.handleSubmit}
        backRoute={''}
        disabled={false}
        shouldGoBack={false}
      />
    ),
    [colors.primary, formik.handleSubmit],
  );

  React.useLayoutEffect(() => {
    setOptions({
      headerLeft: headerLeftButton,
      headerRight: headerRightButton,
    });
  }, [setOptions, headerLeftButton, headerRightButton]);

  if (isFetching) {
    return <Loader />;
  }

  if (!group) {
    return null;
  }

  return (
    <View style={styles.container}>
      <GroupForm avatar={avatar} setAvatar={setAvatar} formik={formik} />
    </View>
  );
};

export default EditGroup;
