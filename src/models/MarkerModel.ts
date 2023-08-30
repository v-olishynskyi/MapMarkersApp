import { Marker } from '@common/types/entities';
import UserModel from '@models/UserModel';

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
  }

  private handleData(marker: Marker) {
    const keys = Object.keys(marker);
    keys.forEach(key => (this[key] = marker[key]));
    if (marker.user instanceof UserModel) {
      this.user = marker.user;
    } else {
      this.user = new UserModel(marker.user);
    }
  }
}
