import { axiosInstance } from '../config';
import { User } from '../models/models';

export const getUserByEmail = (email: string) => {
  return axiosInstance.get(`/users/get-user-by-email/${email}`);
};

export const updateUser = (input: User) => {
  return axiosInstance.put('/users', input);
};
