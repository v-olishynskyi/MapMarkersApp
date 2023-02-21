import { AxiosResponse } from 'axios';
import { User, Marker, Category } from '../models/models';
import { ResponseModels } from '../models/types';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export enum ResponseStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
}

type AvailableResponseField = 'user' | 'marker' | 'category';

type ResponseDataField<K extends AvailableResponseField> = K extends 'user'
  ? 'user'
  : K extends 'marker'
  ? 'marker'
  : K extends 'category'
  ? 'category'
  : never;

type ResponseError = {
  code: number;
  message: string;
};

export type BaseResponse<
  T extends ResponseModels,
  K extends AvailableResponseField,
> = {
  status: ResponseStatus;
  data: {
    [Key in ResponseDataField<K>]: T;
  };
  error?: ResponseError;
};

export type Response<
  T extends ResponseModels,
  K extends AvailableResponseField,
> = T extends User
  ? AxiosResponse<BaseResponse<User, K>>
  : T extends Marker
  ? AxiosResponse<BaseResponse<Marker, K>>
  : T extends Category
  ? AxiosResponse<BaseResponse<Category, K>>
  : never;

export interface LatLng {
  lat: number;
  lng: number;
}
export interface PlusCode {
  compound_code: string;
  global_code: string;
}
export interface GeocoderResponse {
  plus_code: PlusCode;
  results: {
    address_components: {
      long_name: string;
      short_name: string;
      types: string[];
    }[];
    formatted_address: string;
    geometry: {
      bounds: {
        northeast: LatLng;
        southwest: LatLng;
      };
      location: LatLng;
      location_type: 'APPROXIMATE' | 'ROOFTOP' | string;
      viewport: {
        northeast: LatLng;
        southwest: LatLng;
      };
    };
    place_id: string;
    types: string[];
    plus_code: PlusCode;
  }[];
  status: 'OK' | string;
}
