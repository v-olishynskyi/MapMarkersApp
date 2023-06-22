/**
 * @namespace EditProfile
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { Header } from './components';
import { useStores } from '@store';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input } from '@components';
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
    userStore: { updateData, onChangeUpdateData },
  } = useStores();

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}>
      <Input
        caption="Імʼя"
        value={updateData.first_name}
        onChangeText={value => onChangeUpdateData('first_name', value)}
        style={styles.input}
      />
      <Input
        caption="Прізвище"
        value={updateData.last_name}
        onChangeText={value => onChangeUpdateData('last_name', value)}
        style={styles.input}
      />
      <Input
        caption="По-батькові"
        value={updateData.middle_name || ''}
        placeholder=""
        onChangeText={value => onChangeUpdateData('middle_name', value)}
      />
    </KeyboardAwareScrollView>
  );
};

export default observer(EditProfile);
