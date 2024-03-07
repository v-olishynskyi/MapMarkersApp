/**
 * @namespace GroupForm
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { GroupFormProps } from './types';
import { Avatar, Input, RadioButton } from '@components';
import ActionSheet from 'react-native-ui-lib/actionSheet';
import { openPicker } from 'react-native-image-crop-picker';
import { PublicFileModel } from '@models';
import RadioGroup from 'react-native-ui-lib/radioGroup';
import { GroupPrivacyCodes } from '@common/types';
import { ButtonProps } from 'react-native-ui-lib';

/**
 * GroupForm
 *
 * @memberof
 * @param {GroupFormProps} params
 *
 * @example
 * // How to use GroupForm:
 *  <GroupForm />
 */
const GroupForm: React.FC<GroupFormProps> = ({
  avatar,
  setAvatar,
  formik: {
    errors,
    touched,
    values: { name, privacyCode, description },
    handleBlur,
    setFieldValue,
    setFieldTouched,
  },
}) => {
  const styles = useStyles();

  const [showActionSheet, setShowActionSheet] = React.useState(false);

  const openActionSheet = () => setShowActionSheet(true);
  const onDismissActionSheet = () => setShowActionSheet(false);

  const handleEditAvatar = () => {
    openPicker({
      cropping: true,
      mediaType: 'photo',
      cropperCircleOverlay: true,
    }).then(async image => {
      const newAvatar = new PublicFileModel({
        id: image.path,
        key: '',
        url: image.path,
        mime: image.mime,
        created_at: new Date().toString(),
        updated_at: new Date().toString(),
      });

      setAvatar(newAvatar);
    });
  };

  const handleRemoveAvatar = () => setAvatar(null);

  const actionSheetOptions: ButtonProps[] = [
    {
      label: 'Змінити',
      onPress: handleEditAvatar,
    },
    ...(avatar ? [{ label: 'Видалити', onPress: handleRemoveAvatar }] : []),
    // { label: 'Закрити', onPress: onDismissActionSheet },
  ];

  return (
    <>
      <Avatar
        fullname={''}
        initials={''}
        containerStyle={styles.avatar}
        url={avatar?.url}
        size={100}
        onPress={openActionSheet}
      />

      <Input
        id="name"
        value={name}
        caption="Назва"
        placeholder="Введіть назву групи"
        onBlur={handleBlur('name')}
        onFocus={() => setFieldTouched('name')}
        onChangeText={value => setFieldValue('name', value)}
        error={touched.name && errors.name}
        style={styles.input}
      />
      <Input
        value={description || ''}
        caption="Опис"
        placeholder="Введіть опис групи"
        multiline
        maxLength={255}
        onFocus={() => setFieldTouched('description')}
        onBlur={handleBlur('description')}
        onChangeText={value => setFieldValue('description', value)}
        style={styles.mb4}
      />

      <RadioGroup
        initialValue={privacyCode}
        onValueChange={(value: string) => setFieldValue('privacyCode', value)}>
        <RadioButton
          value={GroupPrivacyCodes.PRIVATE}
          label="Приватна"
          containerStyle={styles.input}
        />
        <RadioButton
          value={GroupPrivacyCodes.PUBLIC}
          label="Публічна"
          containerStyle={styles.input}
        />
      </RadioGroup>

      <ActionSheet
        visible={showActionSheet}
        destructiveButtonIndex={avatar ? 1 : 2}
        useNativeIOS
        options={actionSheetOptions}
        onDismiss={onDismissActionSheet}
        showCancelButton
      />
    </>
  );
};

export default GroupForm;
