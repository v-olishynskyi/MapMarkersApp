import { axiosInstance } from '../config';

export type signUpParams = {
  email: string;
  username: string;
  name: string;
  family_name: string;
  email_verified: boolean;
};

export type signInParams = {
  email: string;
  password: string;
};

export const signUp = async (body: signUpParams) => {
  return await axiosInstance.post('/auth/sign-up', body);
};
export const signIn = async (body: signInParams) => {
  return await axiosInstance.post('/auth/sign-in', body);
};
export const signOut = async () => {
  return await axiosInstance.get('/auth/sign-out');
};
