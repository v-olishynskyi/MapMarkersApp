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
  UserMarkers,
  UserGroups,
  GroupView,
  EditGroup,
  CreateGroup,
} from '@screens';
import { IconButton } from '@components';
import { observer } from 'mobx-react-lite';
import { Map, MarkerBottomSheet } from '@modules';

const Stack = createNativeStackNavigator<AppStackParamsList>();

const AppNavigation: React.FC = () => {
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
          name="user-sessions"
          component={Sessions}
          options={{
            title: 'Пристрої',
            headerBackTitle: 'Налаштування',
          }}
        />
        <Stack.Screen
          name="user-markers"
          component={UserMarkers}
          options={{
            title: 'Маркери',
            headerBackTitle: 'Профіль',
          }}
        />
        <Stack.Screen
          name="user-groups"
          component={UserGroups}
          options={{
            title: 'Групи',
            headerBackTitle: 'Профіль',
          }}
        />
        <Stack.Screen
          name="profile-view"
          component={ProfileView}
          options={{
            title: 'Профіль',
            headerBackTitle: 'Назад',
          }}
        />
        <Stack.Screen
          name="edit-profile"
          component={EditProfile}
          options={{
            presentation: 'formSheet',
            title: 'Редагування профілю',
            headerBackVisible: true,
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
        <Stack.Group>
          <Stack.Screen
            name="group-view"
            component={GroupView}
            options={{ headerShown: true, presentation: 'card' }}
          />
          <Stack.Screen
            name="edit-group"
            component={EditGroup}
            options={{
              presentation: 'modal',
              headerShown: true,
              gestureEnabled: false,
              headerTitle: 'Редагування групи',
            }}
          />
          <Stack.Screen
            name="create-group"
            component={CreateGroup}
            options={{
              presentation: 'modal',
              headerShown: true,
              gestureEnabled: false,
              headerTitle: 'Створення групи',
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
      <MarkerBottomSheet />
    </>
  );
};

export default observer(AppNavigation);
