import { Entities, User, UserSession } from '@common/types/entities';
import { UserModel, UserSessionModel } from '@models';

export type Models = UserModel;

export type EntityToModel<T extends Entities> = T extends User
  ? UserModel
  : T extends UserSession
  ? UserSessionModel
  : never;

export type ModelConstructor<T extends Entities> = T extends User
  ? typeof UserModel
  : T extends UserSession
  ? typeof UserSessionModel
  : never;
