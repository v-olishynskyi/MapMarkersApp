import { action, makeObservable, observable } from 'mobx';
import { MarkerModel } from '../models/MarkerModel';
import { markers as mockedMarkers } from '../mock/markers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryModel from '../models/CategoryModel';
import { api } from '../api';
import { Category } from '../models/models';
import { Response } from '../types';

export default class DataStore {
  isFetchingMarkers: boolean = false;

  markers: Array<MarkerModel> = [];
  categories: Array<CategoryModel> = [];

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

  async loadCategories() {
    const data: Response<Category, 'category'> = await api.getAllCategories();
  }

  setIsFetchingMarkers = (value: boolean) => {
    this.isFetchingMarkers = value;
  };
}
