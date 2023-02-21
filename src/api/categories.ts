import { axiosInstance } from '../config';

export type CreateCategoryParams = {
  label: string;
  value?: string;
  isAccept: boolean;
};

export const getAllCategories = () => axiosInstance.get('/category');

export const getCategory = (id: string) => {
  return axiosInstance.post(`/category/${id}`);
};

export const createCategory = (body: CreateCategoryParams) => {
  return axiosInstance.post('/category', body);
};
