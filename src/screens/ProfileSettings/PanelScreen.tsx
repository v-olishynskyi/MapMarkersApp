import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomButton } from '../../components/buttons';
import { CustomTextInput } from '../../components/inputs';
import { hooks } from '../../hooks';
import { ProfileSettings } from '../../navigation/types';
import { wait } from '../../utils/wait';

type Navigation = StackNavigationProp<ProfileSettings>;

const ProfileSettingsScreen = () => {
  const navigation = useNavigation<Navigation>();

  const { mainStore } = hooks.useStores();

  const [loadingSave, setLoadingSave] = React.useState(false);

  const handlePressSave = async () => {
    setLoadingSave(true);

    await wait(3000);
    navigation.goBack();

    setLoadingSave(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar
            rounded
            size="large"
            title={'MD'}
            titleStyle={{ color: '#fff' }}
            containerStyle={{ backgroundColor: 'gray' }}
            // source={require('../../../assets/BluredMap.jpg')}
          >
            <Avatar.Accessory size={22} onPress={() => {}} />
          </Avatar>
        </View>
        <View>
          <CustomTextInput
            label={`Ім'я`}
            placeholder={`Ім'я`}
            labelStyle={{ color: 'gray' }}
            inputStyle={{ borderWidth: 1 }}
            value={mainStore.user?.name}
          />
          <CustomTextInput
            label={`Прізвище`}
            placeholder={`Прізвище`}
            labelStyle={{ color: 'gray' }}
            inputStyle={{ borderWidth: 1 }}
            value={mainStore.user?.family_name}
          />
          <CustomTextInput
            label={`Електронна пошта`}
            placeholder={`Email`}
            labelStyle={{ color: 'gray' }}
            inputStyle={{ borderWidth: 1 }}
            editable={false}
            value={mainStore.user?.email}
          />
        </View>
      </KeyboardAwareScrollView>
      <CustomButton
        title="Зберегти"
        buttonStyle={{ marginBottom: 50, marginHorizontal: 16 }}
        onPress={handlePressSave}
        loading={loadingSave}
        disabled={loadingSave}
      />
    </View>
  );
};

export default ProfileSettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
});
