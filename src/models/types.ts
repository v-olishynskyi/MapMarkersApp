import { MarkerModel } from '../models/MarkerModel';
import { UserModel } from '../models/UserModel';
import { Marker, User } from '../models/models';

export type ResponseModels = Marker | User;

export type Models = MarkerModel | UserModel;

export type ResponseModelToModel<T extends ResponseModels> = T extends Marker
  ? MarkerModel
  : T extends User
  ? UserModel
  : never;

export type ModelConstructor<T extends ResponseModels> = T extends Marker
  ? typeof MarkerModel
  : T extends User
  ? typeof UserModel
  : never;
