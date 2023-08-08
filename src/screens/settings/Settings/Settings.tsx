/**
 * @namespace Settings
 * @category Screens
 * @subcategory Settings screens
 */
import React from 'react';
import useStyles from './styles';
import { useStores } from '@store';
import { ScrollView, Text } from 'react-native';
import { Pressable } from '@components';
import { generalStyles } from '@styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamsList } from '@navigation';
import { observer } from 'mobx-react-lite';

/**
 * Settings
 *
 * @memberof Screens
 *
 * @example
 * // How to use Settings:
 *  <Settings />
 */
const Settings: React.FC = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();
  const styles = useStyles();
  const {
    userStore: { user },
  } = useStores();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Pressable
        style={[generalStyles.rowBetween]}
        onPress={() => navigate('sessions')}>
        <Text>Пристрої</Text>
        <Text>{user.sessions.items.length}</Text>
      </Pressable>
    </ScrollView>
  );
};

export default observer(Settings);
