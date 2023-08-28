/**
 * @namespace EditProfile
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { useStores } from '@store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input, Toast } from '@components';
import { observer } from 'mobx-react-lite';

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
  const styles = useStyles();

  const {
    userStore: {
      updateFormData: { first_name, last_name, middle_name, username },
      onChangeUpdateData,
    },
  } = useStores();

  return (
    <>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}>
        <Input
          caption="Імʼя"
          value={first_name}
          onChangeText={value => onChangeUpdateData('first_name', value)}
          style={styles.inputContainer}
          inputStyle={styles.input}
        />
        <Input
          caption="Прізвище"
          value={last_name}
          onChangeText={value => onChangeUpdateData('last_name', value)}
          style={styles.inputContainer}
          inputStyle={styles.input}
        />
        <Input
          caption="По-батькові"
          value={middle_name || ''}
          placeholder=""
          onChangeText={value => onChangeUpdateData('middle_name', value)}
          style={styles.inputContainer}
          inputStyle={styles.input}
        />
        <Input
          caption="Імʼя користувача"
          value={username || ''}
          placeholder=""
          onChangeText={value => onChangeUpdateData('username', value)}
          inputStyle={styles.input}
        />
      </KeyboardAwareScrollView>
      <Toast />
    </>
  );
};

export default observer(EditProfile);
