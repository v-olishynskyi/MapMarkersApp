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
