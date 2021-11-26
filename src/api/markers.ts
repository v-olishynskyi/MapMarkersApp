import { axiosInstance } from '../config';

export type CreateMarkerParams = {
  name: string;
  latitude: number;
  longitude: number;
  ownerID: string;
  description?: string;
};

export const createMarker = (body: CreateMarkerParams) => {
  return axiosInstance.post('/markers', body);
};
