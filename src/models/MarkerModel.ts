import { action, computed, makeObservable, observable } from 'mobx';
import { createMarker, CreateMarkerParams } from '../api/markers';
import { Coordinates, Response } from '../types';
import CategoryModel from './CategoryModel';
import { Marker } from './models';
import { UserModel } from './UserModel';

export class MarkerModel {
  id: Marker['_id'] = '';
  latitude: Marker['latitude'] = 0;
  longitude: Marker['longitude'] = 0;
  name: Marker['name'] = '';
  description: Marker['description'] = '';
  ownerID: string = '';
  owner: UserModel;
  categoryID: string = '';
  category: CategoryModel;

  createdAt: Marker['createdAt'];
  updatedAt: Marker['updatedAt'];

  constructor(marker: Marker) {
    this.handleResponse(marker);

    makeObservable(this, {
      id: observable,
      latitude: observable,
      longitude: observable,
      name: observable,
      description: observable,
      // owner: observable,

      setCoordinates: action,
      setName: action,
      setDescription: action,
      setOwnerID: action,
      // setOwner: action,

      coordinates: computed,
      coordinatesString: computed,
    });
  }

  private handleResponse(marker: Marker) {
    if (marker._id) {
      this.id = marker._id;
    }
    if (marker.latitude) {
      this.latitude = marker.latitude;
    }
    if (marker.longitude) {
      this.longitude = marker.longitude;
    }
    if (marker.name) {
      this.name = marker.name;
    }
    if (marker.description) {
      this.description = marker.description;
    }
    if (marker.owner) {
      this.owner = new UserModel(marker.owner);
    }
    if (marker.category) {
      this.category = new CategoryModel(marker.category);
    }
    if (marker.createdAt) {
      this.createdAt = marker.createdAt;
    }
    if (marker.description) {
      this.updatedAt = marker.updatedAt;
    }
  }

  setCoordinates = ({ latitude, longitude }: Coordinates) => {
    this.latitude = latitude;
    this.longitude = longitude;
  };

  setCategoryID = (value: string) => {
    this.categoryID = value;
  };

  setName = (name: string) => {
    this.name = name;
  };

  setDescription = (description: string) => {
    this.description = description;
  };

  setOwner = (author: UserModel) => {
    this.owner = author;
  };

  setOwnerID = (id: string) => {
    this.ownerID = id;
  };

  static async create(input: CreateMarkerParams) {
    const result: Response<Marker, 'marker'> = await createMarker(input);

    return result.data;
  }

  get coordinatesString() {
    return `${this.latitude}, ${this.longitude}`;
  }

  get coordinates() {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
    };
  }
}
