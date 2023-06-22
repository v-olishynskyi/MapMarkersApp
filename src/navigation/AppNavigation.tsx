import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigation, navigationRef } from './';
import { AppStackParamsList } from './types';
import { AboutUs, EditProfile, ProfileView, Settings } from '@screens';
import Icon from 'react-native-vector-icons/Ionicons';
import { Pressable } from '@components';
import { getTheme } from '@utils/helpers';
import { ActivityIndicator, Text } from 'react-native';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import { generalStyles, spacingBase } from '@styles';

const Stack = createNativeStackNavigator<AppStackParamsList>();

const EditProfileHeaderButton: FC<{
  canGoBack: boolean;
  label: string;
  color: string;
  loading?: boolean;
  onPress?: VoidFunction;
}> = ({ canGoBack, label, color, loading, onPress }) => {
  const { typography, colors } = getTheme();

  const onPressCancel = () =>
    onPress
      ? onPress()
      : canGoBack
      ? navigationRef.goBack()
      : navigationRef.navigate('profile-view' as any);

  return (
    <Pressable
      onPress={onPressCancel}
      style={[generalStyles.row]}
      disabled={loading}>
      {loading && (
        <ActivityIndicator
          size={'small'}
          style={{ marginRight: spacingBase.s1 }}
        />
      )}
      <Text
        style={{
          ...typography.regular.body,
          color: loading ? colors.gray : color,
        }}>
        {label}
      </Text>
    </Pressable>
  );
};

const AppNavigation = () => {
  const { colors } = getTheme();
  const {
    userStore: { isSaving, updateProfile },
  } = useStores();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="tabs"
        component={TabNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="settings"
        component={Settings}
        options={{
          title: 'Налаштування',
          headerBackTitle: 'Назад',
        }}
      />
      <Stack.Screen
        name="profile-view"
        component={ProfileView}
        options={{
          title: 'Профіль',
          headerRight: () => (
            <Pressable
              onPress={() => navigationRef.navigate('edit-profile' as any)}>
              <Icon name="md-pencil" size={24} color={colors.primary} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="edit-profile"
        component={EditProfile}
        options={{
          presentation: 'formSheet',
          // headerShown: false,
          title: 'Редагування профілю',
          // gestureEnabled: false,
          headerBackVisible: true,
          headerLeft: ({ canGoBack }) => (
            <EditProfileHeaderButton
              canGoBack={canGoBack}
              color={colors.red}
              label={'Відмінити'}
            />
          ),
          headerRight: ({ canGoBack }) => (
            <EditProfileHeaderButton
              canGoBack={canGoBack}
              color={colors.primary}
              label={'Зберегти'}
              loading={isSaving}
              onPress={updateProfile}
            />
          ),
        }}
      />
      <Stack.Screen
        name="about-us"
        component={AboutUs}
        options={{ title: 'Про нас' }}
      />
    </Stack.Navigator>
  );
};

export default observer(AppNavigation);
