import { action, makeObservable, observable } from 'mobx';
import { MarkerModel } from '../models/MarkerModel';
import { markers as mockedMarkers } from '../mock/markers';

export default class DataStore {
  markers: Array<MarkerModel> = observable.array(mockedMarkers);

  constructor() {
    makeObservable(this, {
      markers: observable,
      loadMarkers: action,
    });
  }

  async loadMarkers() {
    const markers = JSON.parse();
  }
}
