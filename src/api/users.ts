import { axiosInstance } from '../config';
import { User } from '../models/models';

export type UpdateUserParams = Partial<
  Omit<User, '_id' | 'markers' | 'createdAt' | 'updatedAt'>
> & {
  id: string;
};

export const getUserByEmail = (email: string) => {
  return axiosInstance.get(`/users/get-user-by-email/${email}`);
};

export const getUserById = (id: string) => {
  return axiosInstance.get(`/users/${id}`);
};

export const updateUser = (input: UpdateUserParams) => {
  return axiosInstance.put(`/users/${input.id}`, { user: input });
};
