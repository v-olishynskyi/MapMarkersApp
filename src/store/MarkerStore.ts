import { action, computed, makeObservable, observable } from 'mobx';
import { LatLng } from 'react-native-maps';
import { MarkerModel } from '../models/MarkerModel';
import { Marker } from '../models/models';
import { UserModel } from '../models/UserModel';

export default class MarkerStore {
  name: Marker['name'] = '';
  description: Marker['description'] = '';
  latitude: Marker['latitude'] = 0;
  longitude: Marker['longitude'] = 0;
  author: Marker['author'] | null = null;

  initialData: Marker = {
    id: 'fakeId',
    name: '',
    description: '',
    latitude: 0,
    longitude: 0,
    author: null,
  };

  marker = new MarkerModel(this.initialData);

  constructor() {
    makeObservable(this, {
      name: observable,
      description: observable,
      latitude: observable,
      longitude: observable,
      author: observable,

      setName: action,
      setDescription: action,
      setCoordinate: action,
      setAuthor: action,
      clear: action,
      remove: action,

      coordinates: computed,

      marker: observable,
    });
  }

  setName = (name: string) => {
    this.name = name;
  };

  setDescription = (description: string) => {
    this.description = description;
  };

  setCoordinate = (coordinate: LatLng) => {
    this.latitude = coordinate.latitude;
    this.longitude = coordinate.longitude;
  };

  setAuthor = (author: UserModel) => {
    this.author = author;
  };

  clear() {
    this.name = '';
    this.description = '';
    this.latitude = 0;
    this.longitude = 0;
    this.author = null;
  }

  remove() {
    this.marker = new MarkerModel(this.initialData);
  }

  get coordinates() {
    return `${this.latitude}, ${this.longitude}`;
  }
}
