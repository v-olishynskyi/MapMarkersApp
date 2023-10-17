import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigation, navigationRef } from './';
import { AppStackParamsList } from './types';
import {
  AboutUs,
  EditProfile,
  MarkerManagement,
  ProfileView,
  Sessions,
  Settings,
} from '@screens';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderButton, IconButton, Pressable } from '@components';
import { getTheme } from '@common/helpers';
import { useStores } from '@store';
import { observer } from 'mobx-react-lite';
import { Map, MarkerBottomSheet } from '@modules';

const Stack = createNativeStackNavigator<AppStackParamsList>();

const AppNavigation: React.FC = () => {
  const { colors } = getTheme();
  const {
    userStore: { isSaving, updateProfile, resetUpdateFormData },
    profileViewStore: { isMe },
  } = useStores();

  const profileHeaderRight = React.useCallback(() => {
    return isMe ? (
      <Pressable onPress={() => navigationRef.navigate('edit-profile' as any)}>
        <Icon name="md-pencil" size={24} color={colors.primary} />
      </Pressable>
    ) : null;
  }, [colors.primary, isMe]);

  const editProfileHeaderLeft = React.useCallback(
    ({ canGoBack }: { canGoBack: boolean }) => (
      <HeaderButton
        canGoBack={canGoBack}
        color={colors.red}
        label={'Відмінити'}
        onPress={resetUpdateFormData}
        backRoute={'profile-view'}
      />
    ),
    [colors.red, resetUpdateFormData],
  );
  const editProfileHeaderRight = React.useCallback(
    ({ canGoBack }: { canGoBack: boolean }) => (
      <HeaderButton
        canGoBack={canGoBack}
        color={colors.primary}
        label={'Зберегти'}
        loading={isSaving}
        onPress={updateProfile}
        backRoute={'profile-view'}
      />
    ),
    [colors.primary, updateProfile, isSaving],
  );
  const locationHeaderLeft = React.useCallback(
    () => <IconButton icon="close" onPress={navigationRef.goBack} />,
    [],
  );

  return (
    <>
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
          name="sessions"
          component={Sessions}
          options={{
            title: 'Пристрої',
            headerBackTitle: 'Назад',
          }}
        />
        <Stack.Screen
          name="profile-view"
          component={ProfileView}
          options={{
            title: 'Профіль',
            headerRight: profileHeaderRight,
          }}
        />
        <Stack.Screen
          name="edit-profile"
          component={EditProfile}
          options={{
            presentation: 'formSheet',
            title: 'Редагування профілю',
            headerBackVisible: true,
            headerLeft: editProfileHeaderLeft,
            headerRight: editProfileHeaderRight,
          }}
        />
        <Stack.Screen
          name="about-us"
          component={AboutUs}
          options={{ title: 'Про нас' }}
        />
        <Stack.Screen
          name="marker-management"
          component={MarkerManagement}
          options={{
            presentation: 'modal',
            headerShown: true,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="location"
          component={Map}
          options={{
            presentation: 'fullScreenModal',
            title: 'Вибір локації',
            headerLeft: locationHeaderLeft,
          }}
        />
      </Stack.Navigator>
      <MarkerBottomSheet />
    </>
  );
};

export default observer(AppNavigation);
