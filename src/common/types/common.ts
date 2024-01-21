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

export type BaseImage = Pick<File, 'id' | 'url'>;
