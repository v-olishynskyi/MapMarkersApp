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
  'edit-group': { groupId: string };
  'marker-management': { mode: MarkerManagementModes };
  location: undefined;
};

export enum MarkerManagementModes {
  CREATE = 'create',
  EDIT = 'edit',
}

export type MapStackParamsList = {
  'map-screen': undefined;
};
