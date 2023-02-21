import { signIn, signUp, signOut } from './auth';
import {
  createMarker,
  getMarkerById,
  getMarkers,
  updateMarker,
} from './markers';
import { getUserByEmail, updateUser, getUserById } from './users';
import { createCategory, getCategory, getAllCategories } from './categories';

export const api = {
  signIn,
  signUp,
  signOut,
  createMarker,
  getUserByEmail,
  updateUser,
  getUserById,
  getMarkerById,
  getMarkers,
  updateMarker,
  createCategory,
  getCategory,
  getAllCategories,
};
