/**
 * @namespace Settings
 * @category Screens
 * @subcategory Settings screens
 */
import React from 'react';
import useStyles from './styles';
import { useStores } from '@store';
import { ScrollView } from 'react-native';
import { Menu } from '@components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamsList } from '@navigation';
import { observer } from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/Ionicons';
import { getTheme } from '@common/helpers';

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
  const { colors } = getTheme();

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
      <Menu
        items={[
          {
            label: 'Пристрої',
            icon: (
              <Icon
                size={20}
                name="phone-portrait-outline"
                color={colors.white}
              />
            ),
            onPress: () => navigate('user-sessions'),
            iconColor: colors.orange,
            secondaryLabel: user.sessions.items.length.toString(),
          },
        ]}
      />
    </ScrollView>
  );
};

export default observer(Settings);
