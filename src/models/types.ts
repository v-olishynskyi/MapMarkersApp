import {
  Entities,
  Marker,
  PublicFile,
  User,
  UserSession,
  Group,
} from '@common/types/entities';
import {
  MarkerModel,
  UserModel,
  UserSessionModel,
  PublicFileModel,
  GroupModel,
} from '@models';

export type Models =
  | UserModel
  | MarkerModel
  | UserSessionModel
  | PublicFileModel
  | GroupModel;

export type EntityToModel<T extends Entities> = T extends User
  ? UserModel
  : T extends Marker
  ? MarkerModel
  : T extends UserSession
  ? UserSessionModel
  : T extends PublicFile
  ? PublicFileModel
  : T extends Group
  ? GroupModel
  : never;

export type ModelConstructor<T extends Entities> = T extends User
  ? typeof UserModel
  : T extends Marker
  ? typeof MarkerModel
  : T extends UserSession
  ? typeof UserSessionModel
  : T extends PublicFile
  ? typeof PublicFileModel
  : T extends Group
  ? typeof GroupModel
  : never;
