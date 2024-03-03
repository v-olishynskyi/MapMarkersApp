export type Size = {
  width: number;
  height: number;
};

export enum Platforms {
  IOS = 'iOS',
  ANDROID = 'Android',
  MACOS = ' acOS',
  DESKTOP = 'Desktop',
}

export type Device = {
  id: string;
  name: string;
  platform: Platforms;
};

export enum Orientations {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
}

export type LatLng = {
  latitude: number;
  longitude: number;
};

export type Coordinates = LatLng & {
  latitudeDelta: number;
  longitudeDelta: number;
};

export type File = {
  id: string;
  url: string;
  key: string;
  created_at: string;
  updated_at: string;
};

export enum FileTypes {
  Avatar = 'avatar',
}

export type PaginationParams = {
  page: number;
  limit: number;
};

export enum SortByDirections {
  ASC = 'asc',
  DESC = 'desc',
}

export type SortOption = {
  sort_by: any;
  direction: SortByDirections;
  label?: string;
};

export enum GroupPrivacyCodes {
  PUBLIC = 'public',
  PRIVATE = 'private',
}
