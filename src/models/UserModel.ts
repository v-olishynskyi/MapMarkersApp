import {
  action,
  computed,
  IObservableArray,
  makeObservable,
  observable,
} from 'mobx';
import { User, Gender } from './models';
import { MarkerModel } from './MarkerModel';
import { Response, ResponseStatus } from '../types';
import { api } from '../api';
import { UpdateUserParams } from '../api/users';

type UpdatedFields = Pick<User, 'family_name' | 'gender' | 'name'>;

export class UserModel {
  id: User['_id'] = '';
  email: User['email'] = '';
  username: User['username'] = '';
  name: User['name'] = '';
  family_name: User['family_name'] = '';
  gender: User['gender'] = Gender.EMPTY;
  markers: MarkerModel[] = observable<MarkerModel>([]);
  avatar?: User['avatar'] = '';
  createdAt?: User['createdAt'];
  updatedAt?: User['updatedAt'];

  constructor(user: User) {
    this.id = user._id;
    this.handleResponse(user);

    makeObservable(this, {
      name: observable,
      family_name: observable,
      gender: observable,
      markers: observable,
      avatar: observable,

      setName: action,
      setFamilyName: action,
      setGender: action,
      setMarkers: action,
      addMarker: action,
      setAvatar: action,

      markersCount: computed,
      fullName: computed,
      updatedData: computed,
    });
  }

  private handleResponse(user: User) {
    if (user.email) {
      this.email = user.email;
    }
    if (user.username) {
      this.username = user.username;
    }
    if (user.name) {
      this.name = user.name;
    }
    if (user.family_name) {
      this.family_name = user.family_name;
    }
    if (user.gender) {
      this.gender = user.gender;
    }
    if (user.createdAt) {
      this.createdAt = user.createdAt;
    }
    if (user.updatedAt) {
      this.updatedAt = user.updatedAt;
    }
    if (user.markers) {
      const markers = user.markers.map(marker => new MarkerModel(marker));
      this.markers = markers;
    }
  }

  setName(name: string) {
    this.name = name;
  }

  setFamilyName(family_name: string) {
    this.family_name = family_name;
  }

  setGender(gender: Gender) {
    this.gender = gender;
  }

  setMarkers(markers: IObservableArray<MarkerModel>) {
    this.markers = markers;
  }

  setAvatar(avatar: string) {
    this.avatar = avatar;
  }

  addMarker(marker: MarkerModel) {
    this.markers.push(marker);
  }

  get markersCount() {
    return this.markers.length;
  }

  get fullName() {
    return `${this.name || ''} ${this.family_name || ''}`;
  }

  get updatedData(): UpdatedFields {
    return {
      name: this.name,
      family_name: this.family_name,
    };
  }

  async update(input: UpdateUserParams) {
    const response: Response<User, 'user'> = await api.updateUser(input);

    if (response.data.status === ResponseStatus.SUCCESS) {
      return response.data.data.user;
    } else {
      return response.data.error;
    }
  }

  async get() {
    return await api.getUserByEmail(this.email);
  }
}
