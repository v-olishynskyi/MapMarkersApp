import { Entities, Marker, User, UserSession } from '@common/types/entities';
import { MarkerModel, UserModel, UserSessionModel } from '@models';

export type Models = UserModel;

export type EntityToModel<T extends Entities> = T extends User
  ? UserModel
  : T extends Marker
  ? MarkerModel
  : T extends UserSession
  ? UserSessionModel
  : never;

export type ModelConstructor<T extends Entities> = T extends User
  ? typeof UserModel
  : T extends Marker
  ? typeof MarkerModel
  : T extends UserSession
  ? typeof UserSessionModel
  : never;
