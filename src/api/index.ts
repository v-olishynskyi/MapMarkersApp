import { signIn, signUp, signOut } from './auth';
import { createMarker } from './markers';
import { getUserByEmail, updateUser, getUserById } from './users';

export const api = {
  signIn,
  signUp,
  signOut,
  createMarker,
  getUserByEmail,
  updateUser,
  getUserById,
};
