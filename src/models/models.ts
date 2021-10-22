import { IObservableArray } from 'mobx';
import { MarkerModel } from './MarkerModel';
import { UserModel } from './UserModel';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  EMPTY = '',
}

export type Marker = {
  id: string;

  latitude: number;
  longitude: number;

  name: string;
  description?: string;

  author: UserModel;
};

export type User = {
  email: string;
  username: string;

  name: string;
  family_name: string;
  avatar?: string;

  gender: Gender;

  markers: IObservableArray<MarkerModel>;
};
