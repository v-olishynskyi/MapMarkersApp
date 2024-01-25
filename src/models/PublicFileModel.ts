import { PublicFile } from '@common/types/entities';

export default class PublicFileModel {
  id: PublicFile['id'];
  url: PublicFile['url'];
  key: PublicFile['key'];
  mime: PublicFile['mime'];
  created_at: string;
  updated_at: string;

  constructor(file: PublicFile) {
    this.id = file.id;

    this.handleData(file);
  }

  handleData(file: PublicFile) {
    const keys = Object.keys(file);

    // @ts-ignore
    keys.forEach(key => (this[key] = file[key]));

    return this;
  }
}
