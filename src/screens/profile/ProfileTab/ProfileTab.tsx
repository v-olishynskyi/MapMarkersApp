/**
 * @namespace ProfileTab
 * @category
 * @subcategory
 *  */
import React from 'react';
import useStyles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { Avatar, Button, Pressable } from '@components';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import { getTheme } from '@utils/helpers';
import { spacingBase } from '@styles';
import { useNavigation } from '@react-navigation/native';
import { AppStackParamsList } from '@navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * ProfileTab
 *
 *
 * @memberof ProfileTab
 *
 * @example
 * // How to use ProfileTab:
 *  <ProfileTab />
 */
const ProfileTab: React.FC = () => {
  const styles = useStyles();

  const { navigate } =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();

  const { typography, colors } = getTheme();

  const {
    userStore: { avatar_url, fullname, initials, email },
  } = useStores();

  const goToProfile = () => navigate('profile-view', {});

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: spacingBase.s4,
        }}>
        <Avatar
          fullname={fullname}
          initials={initials}
          url={avatar_url}
          containerStyle={{ marginRight: 12 }}
        />
        <View
          style={{
            justifyContent: 'space-around',
            flex: 1,
          }}>
          <Text style={{ ...typography.bold.title3 }}>{fullname}</Text>
          <Text style={{ ...typography.regular.subhead }}>{email}</Text>
        </View>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingTop: 8,
        }}>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 16,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="person-outline"
              size={24}
              style={{ marginRight: 16 }}
              color={colors.text}
            />
            <Text style={{ ...typography.regular.callout, color: colors.text }}>
              Профіль
            </Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color={colors.gray} />
        </Pressable>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 24,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="settings-outline"
              size={24}
              style={{ marginRight: 16 }}
              color={colors.text}
            />
            <Text style={{ ...typography.regular.callout, color: colors.text }}>
              Налаштування
            </Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color={colors.gray} />
        </Pressable>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingTop: 8,
        }}>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 16,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="help-circle-outline"
              size={24}
              style={{ marginRight: 16 }}
              color={colors.text}
            />
            <Text style={{ ...typography.regular.callout, color: colors.text }}>
              Підтримка
            </Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color={colors.gray} />
        </Pressable>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 24,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="information-circle-outline"
              size={24}
              style={{ marginRight: 16 }}
              color={colors.text}
            />
            <Text style={{ ...typography.regular.callout, color: colors.text }}>
              Про нас
            </Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color={colors.gray} />
        </Pressable>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingTop: 8,
        }}>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 16,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name="log-out-outline"
              size={24}
              style={{ marginRight: 16 }}
              color={colors.text}
            />
            <Text style={{ ...typography.regular.callout, color: colors.text }}>
              Вийти
            </Text>
          </View>
        </Pressable>
      </View>
      {/* <Button label="Переглянути профіль" outline onPress={goToProfile} /> */}
    </SafeAreaView>
  );
};

export default observer(ProfileTab);
