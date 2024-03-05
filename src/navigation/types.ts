import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamsList = {
  onboarding: undefined;
  'sign-in': undefined;
  'sign-up': undefined;
  'forgot-password': undefined;
};

export type TabsStackParamsList = {
  'map-tab': undefined;
  'community-tab': { tab: 'users' | 'groups' };
  'profile-tab': undefined;
};

export type ProfileStackParamsList = {
  'profile-view': { userId?: string } | undefined;
  'edit-profile': undefined;
};

export type GroupsStackParamsList = {
  'group-view': { groupId: string };
  'edit-group': { groupId: string };
  'create-group': undefined;
};

export type AppStackParamsList = {
  tabs: NavigatorScreenParams<TabsStackParamsList>;
  support: undefined;
  'about-us': undefined;
  settings: undefined;
  'user-sessions': undefined;
  'user-markers': { userId: string };
  'user-groups': { userId: string };
  'profile-view': { userId?: string } | undefined;
  'edit-profile': undefined;
  'marker-management': { mode: MarkerManagementModes };
  location: undefined;
  groups: NavigatorScreenParams<GroupsStackParamsList>;
};

export enum MarkerManagementModes {
  CREATE = 'create',
  EDIT = 'edit',
}

export type MapStackParamsList = {
  'map-screen': undefined;
};
