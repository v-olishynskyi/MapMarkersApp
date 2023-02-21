import { axiosInstance } from '../config';
import { Marker } from '../models/models';

export type CreateMarkerParams = {
  name: string;
  latitude: number;
  longitude: number;
  ownerID: string;
  categoryID: string;
  description?: string;
};

export type UpdateMarkerParams = Partial<
  Omit<Marker, 'createdAt' | 'updatedAt' | '_id'>
> & { _id: string };

export const getMarkers = (filter: Partial<Marker>) => {
  return axiosInstance.get('/markers', { params: filter });
};

export const getMarkerById = (id: string) => {
  return axiosInstance.get(`/markers/${id}`);
};

export const createMarker = (body: CreateMarkerParams) => {
  return axiosInstance.post('/markers', body);
};

export const updateMarker = (body: UpdateMarkerParams) => {
  return axiosInstance.put('/markers', body);
};
