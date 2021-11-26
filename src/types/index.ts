import { AxiosResponse } from 'axios';
import { User, Marker } from '../models/models';
import { ResponseModels } from '../models/types';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export enum ResponseStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
}

type AvailableResponseField = 'user' | 'marker';

type ResponseDataField<K extends AvailableResponseField> = K extends 'user'
  ? 'user'
  : K extends 'marker'
  ? 'marker'
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
  : never;
