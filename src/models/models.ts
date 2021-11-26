import { IObservableArray } from 'mobx';
import { MarkerModel } from './MarkerModel';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  EMPTY = '',
}

export type Marker = {
  _id: string;
  latitude: number;
  longitude: number;
  name: string;
  description?: string;
  ownerID?: string;
  owner?: User;

  createdAt?: Date;
  updatedAt?: Date;
};

export type User = {
  _id: string;
  email: string;
  username: string;
  name: string;
  family_name: string;
  avatar?: string;
  gender?: Gender;
  markers: Marker[];

  createdAt?: Date;
  updatedAt?: Date;
};
