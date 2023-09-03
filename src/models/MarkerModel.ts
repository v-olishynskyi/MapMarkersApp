import { Marker } from '@common/types/entities';
import UserModel from '@models/UserModel';
import { CreateMarkerData, MarkersService, UpdateMarkerData } from '@services';
import { makeAutoObservable } from 'mobx';

export default class MarkerModel {
  id: Marker['id'];
  name: Marker['name'];
  description: Marker['description'];
  latitude: Marker['latitude'];
  longitude: Marker['longitude'];
  user_id: string;
  user: UserModel;
  created_at: Date;
  updated_at: Date;

  constructor(marker: Marker) {
    this.handleData(marker);

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public handleData(marker: Marker) {
    const keys = Object.keys(marker);
    // @ts-ignore
    keys.forEach((key: any) => (this[key] = marker[key]));

    if (marker.user instanceof UserModel) {
      this.user = marker.user;
    } else {
      this.user = new UserModel(marker.user);
    }
  }

  setName(value: string) {
    this.name = value;
  }

  setDescription(value: string) {
    this.description = value;
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