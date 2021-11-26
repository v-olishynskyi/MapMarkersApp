import { action, makeObservable, observable } from 'mobx';
import { MarkerModel } from '../models/MarkerModel';
import { markers as mockedMarkers } from '../mock/markers';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class DataStore {
  isFetchingMarkers: boolean = false;

  markers: Array<MarkerModel> = [];

  constructor() {
    makeObservable(this, {
      isFetchingMarkers: observable,
      markers: observable,
      loadMarkers: action,
      setIsFetchingMarkers: action,
    });
  }

  async loadMarkers() {
    try {
      const markers: MarkerModel[] | null = JSON.parse(
        await AsyncStorage.getItem('markers'),
      ) as MarkerModel[] | null;

      if (markers) {
        this.markers = markers;
      }
    } catch (error) {
      console.log('loadMarkers error', { error });
    }
  }

  setIsFetchingMarkers = (value: boolean) => {
    this.isFetchingMarkers = value;
  };
}
