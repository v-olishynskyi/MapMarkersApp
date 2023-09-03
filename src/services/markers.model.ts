export type CreateMarkerData = {
  latitude: number;
  longitude: number;
  name: string;
  description: string;
  user_id: string;
};

export type UpdateMarkerData = Partial<Omit<CreateMarkerData, 'userId'>>;
