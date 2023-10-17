import {
  Entities,
  Marker,
  PublicFile,
  User,
  UserSession,
} from '@common/types/entities';
import {
  MarkerModel,
  UserModel,
  UserSessionModel,
  PublicFileModel,
} from '@models';

export type Models =
  | UserModel
  | MarkerModel
  | UserSessionModel
  | PublicFileModel;

export type EntityToModel<T extends Entities> = T extends User
  ? UserModel
  : T extends Marker
  ? MarkerModel
  : T extends UserSession
  ? UserSessionModel
  : T extends PublicFileModel
  ? PublicFileModel
  : never;

export type ModelConstructor<T extends Entities> = T extends User
  ? typeof UserModel
  : T extends Marker
  ? typeof MarkerModel
  : T extends UserSession
  ? typeof UserSessionModel
  : T extends PublicFile
  ? typeof PublicFileModel
  : never;
