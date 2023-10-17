import { Marker, PublicFile } from '@common/types/entities';
import { CreateMarkerData, MarkersService, UpdateMarkerData } from '@services';
import { makeAutoObservable } from 'mobx';
import { ListItems, PublicFileModel, UserModel } from '@models';

export default class MarkerModel {
  id: Marker['id'];
  name: Marker['name'];
  description: Marker['description'];
  images: ListItems<PublicFileModel>;
  latitude: Marker['latitude'];
  longitude: Marker['longitude'];
  user_id: string;
  user: UserModel;
  created_at: Marker['created_at'];
  updated_at: Marker['updated_at'];

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

    if (marker.user) {
      if (marker.user instanceof UserModel) {
        this.user = marker.user;
      } else {
        this.user = new UserModel(marker.user);
      }
    }
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

  static async update(data: UpdateMarkerData) {
    const newMarker = await MarkersService.update(data);

    return newMarker;
  }

  static async delete(id: string) {
    return await MarkersService.delete(id);
  }
}
