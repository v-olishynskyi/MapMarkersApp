import { PublicFile } from '@common/types/entities';

export default class PublicFileModel {
  id: PublicFile['id'];
  url: PublicFile['url'];
  key: PublicFile['key'];
  created_at: PublicFile['created_at'];
  updated_at: PublicFile['updated_at'];

  constructor(file: PublicFile) {
    this.id = file.id;

    this.handleData(file);
  }

  handleData(file: PublicFile) {
    this.id = file.id;
    this.url = file.url;
    this.key = file.key;
    this.created_at = file.created_at;
    this.updated_at = file.updated_at;
  }
}
