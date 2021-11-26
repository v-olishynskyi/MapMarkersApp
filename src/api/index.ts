import { signIn, signUp, signOut } from './auth';
import { createMarker } from './markers';
import { getUserByEmail, updateUser } from './users';

export const api = {
  signIn,
  signUp,
  signOut,
  createMarker,
  getUserByEmail,
  updateUser,
};
