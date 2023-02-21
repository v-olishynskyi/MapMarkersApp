import { MarkerModel } from '../models/MarkerModel';
import { UserModel } from '../models/UserModel';
import { Category, Marker, User } from '../models/models';
import CategoryModel from './CategoryModel';

export type ResponseModels = Marker | User | Category;

export type Models = MarkerModel | UserModel | CategoryModel;

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
