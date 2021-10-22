import { action, makeObservable, observable } from 'mobx';
import { Coordinates } from '../types';
import { Marker } from './models';
import { UserModel } from './UserModel';

export class MarkerModel {
  id: Marker['id'] = '';
  latitude: Marker['latitude'] = 0;
  longitude: Marker['longitude'] = 0;
  name: Marker['name'] = '';
  description: Marker['description'] = '';
  author: Marker['author'];

  constructor(marker: Marker) {
    this.author = marker.author;

    makeObservable(this, {
      id: observable,
      latitude: observable,
      longitude: observable,
      name: observable,
      description: observable,
      author: observable,

      setCoordinates: action,
      setName: action,
      setDescription: action,
      setAuthor: action,
    });

    this.id = marker.id;
    this.latitude = marker.latitude;
    this.longitude = marker.longitude;
    this.name = marker.name;
    this.description = marker.description;
    this.author = marker.author;
  }

  setCoordinates({ latitude, longitude }: Coordinates) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  setName(name: string) {
    this.name = name;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setAuthor(author: UserModel) {
    this.author = author;
  }

  static create(input: Marker) {
    return new MarkerModel(input);
  }
}
