import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { UpdateUserParams } from '../../api/users';
import { CustomButton } from '../../components/buttons';
import { Input } from '../../components/inputs';
import { hooks } from '../../hooks';
import { ProfileSettings } from '../../navigation/types';

type Navigation = StackNavigationProp<ProfileSettings>;

const ProfileSettingsScreen = () => {
  const navigation = useNavigation<Navigation>();

  const { mainStore } = hooks.useStores();
  const { user } = mainStore;

  const [loadingSave, setLoadingSave] = React.useState(false);

  const [name, setName] = React.useState(user!.name || '');
  const [familyName, setFamilyName] = React.useState(user!.family_name || '');

  const handlePressSave = async () => {
    try {
      setLoadingSave(true);

      user!.setName(name);
      user!.setFamilyName(familyName);

      const input: UpdateUserParams = {
        id: mainStore.user!.id,
        family_name: mainStore.user?.family_name,
        name: mainStore.user?.name,
      };

      await user!.update(input);

      navigation.goBack();

      setLoadingSave(false);
    } catch (error) {
      console.log('erorr', error);
    }
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
            containerStyle={{ backgroundColor: 'gray' }}>
            <Avatar.Accessory size={22} onPress={() => {}} />
          </Avatar>
        </View>
        <View>
          <Input
            label={`Ім'я`}
            placeholder={`Ім'я`}
            labelStyle={{ color: 'gray' }}
            inputStyle={{ borderWidth: 1 }}
            value={name}
            onChangeText={setName}
          />
          <Input
            label={`Прізвище`}
            placeholder={`Прізвище`}
            labelStyle={{ color: 'gray' }}
            inputStyle={{ borderWidth: 1 }}
            value={familyName}
            onChangeText={setFamilyName}
          />
          <Input
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
        buttonStyle={{
          marginBottom: 50,
          marginHorizontal: 16,
        }}
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
