import { Marker, PublicFile } from '@common/types/entities';
import { CreateMarkerData, MarkersService, UpdateMarkerData } from '@services';
import { makeAutoObservable } from 'mobx';
import { ListItems, PublicFileModel, UserModel } from '@models';
import { Image } from 'react-native-image-crop-picker';

export default class MarkerModel {
  id: Marker['id'];
  name: Marker['name'];
  description: Marker['description'];
  images: ListItems<PublicFile>;
  latitude: Marker['latitude'];
  longitude: Marker['longitude'];
  is_draft: Marker['is_draft'] = false;
  is_hidden: Marker['is_hidden'] = false;
  author_id: string;
  author: UserModel;

  created_at: string;
  updated_at: string;

  constructor(marker: Marker) {
    this.handleData(marker);

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public handleData(marker: Marker) {
    const keys = Object.keys(marker);

    // @ts-ignore
    keys.forEach((key: any) => (this[key] = marker[key]));

    this.images = new ListItems<PublicFile>(
      PublicFileModel,
      marker?.images || [],
    );

    if (marker.author) {
      if (marker.author instanceof UserModel) {
        this.author = marker.author;
      } else {
        this.author = new UserModel(marker.author);
      }
    }

    return this;
  }

  setName(value: string) {
    this.name = value;
  }

  setDescription(value: string) {
    this.description = value;
  }

  setLatitude(value: number) {
    this.latitude = value;
  }

  setLongitude(value: number) {
    this.longitude = value;
  }

  addTemporaryImage(index: string, file: Image) {
    const temporaryImage = new PublicFileModel({
      id: index,
      url: file.path,
      key: file.filename || `marker-${this.id}-image-${index}`,
      mime: file.mime,
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
    });

    this.images.push(temporaryImage);
  }

  addImage(id: string, uri?: string) {
    const temporaryImage: PublicFileModel = new PublicFileModel({
      id,
      key: null,
      url: uri || '',
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
    });
    this.images.push(temporaryImage);
  }

  replaceImage(id: string, newImage: PublicFile | PublicFileModel) {
    const image =
      newImage instanceof PublicFileModel
        ? newImage
        : new PublicFileModel(newImage);
    const temporaryImageIndex = this.images.items.findIndex(
      item => item.id === id,
    );
    this.images.remove(temporaryImageIndex);
    this.images.push(image);
  }

  static async create(data: CreateMarkerData) {
    const marker = await MarkersService.create(data);

    return marker;
  }

  static async update(id: string, data: UpdateMarkerData) {
    const newMarker = await MarkersService.update(id, data);

    return newMarker;
  }

  static async delete(id: string) {
    return await MarkersService.delete(id);
  }
}
