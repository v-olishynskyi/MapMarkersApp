import { LatLng } from '@common/types';
import { RootStore } from '@store/root.store';
import { makeAutoObservable } from 'mobx';

export class AppStore {
  rootStore: RootStore;

  isGrantedLocationPermission: boolean = false;
  coordinates: LatLng | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setIsGrantedLocationPermission(value: boolean) {
    this.isGrantedLocationPermission = value;
  }

  setCoordinates(coordinates: LatLng) {
    this.coordinates = coordinates;
  }
}
