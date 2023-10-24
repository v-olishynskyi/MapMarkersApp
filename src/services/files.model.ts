import { File } from '@common/types';

export type UploadFileResponse = File;

export enum FileTypeEnum {
  AVATAR = 'avatar',
  MARKER_IMAGE = 'marker_image',
}

export type UploadFileBody = {
  entity_type: FileTypeEnum;
  entity_id: string;
};
