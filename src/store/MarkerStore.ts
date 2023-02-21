import { makeObservable, observable } from 'mobx';
import { MarkerModel } from '../models/MarkerModel';
import { Marker } from '../models/models';

export default class MarkerStore {
  initialData: Marker = {
    id: 'fakeId',
    name: '',
    description: '',
    latitude: 0,
    longitude: 0,
    ownerID: '',
    categoryID: '',
  };

  marker = new MarkerModel(this.initialData);

  constructor() {
    makeObservable(this, {
      marker: observable,
    });
  }

  remove() {
    this.marker = new MarkerModel(this.initialData);
  }
}
