import MapScreen from './Map/MapScreen';
import ProfileScreen from './Profile/ProfileScreen';
import SignInScreen from './Auth/SignInScreen';
import SignUpScreen from './Auth/SignUpScreen';
import ProfileSettingsScreen from './ProfileSettings/PanelScreen';
import UserCommentsScreen from './User/UserCommentsScreen';
import CommentScreen from './User/CommentScreen';
import UserMarkersScreen from './User/UserMarkersScreen';

const Screens = {
  // Auth
  SignIn: SignInScreen,
  SignUp: SignUpScreen,

  // user
  Comments: UserCommentsScreen,
  Comment: CommentScreen,
  Markers: UserMarkersScreen,
};

const TabScreen = {
  Map: MapScreen,
  Profile: ProfileScreen,
};

const ProfileSettingsScreens = {
  ProfileSettings: ProfileSettingsScreen,
};

export default Screens;

export { TabScreen, ProfileSettingsScreens };
