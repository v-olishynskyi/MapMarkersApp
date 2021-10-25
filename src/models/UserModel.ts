import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  action,
  computed,
  IObservableArray,
  makeObservable,
  observable,
} from 'mobx';
import { User, Gender } from './models';
import { MarkerModel } from './MarkerModel';

type UpdatedFields = Pick<User, 'family_name' | 'gender' | 'name' | 'username'>;

export class UserModel {
  readonly email: User['email'] = '';
  readonly username: User['username'] = '';
  name: User['name'] = '';
  family_name: User['family_name'] = '';
  gender: User['gender'] = Gender.EMPTY;
  markers: User['markers'] = observable<MarkerModel>([]);
  avatar: User['avatar'] = '';

  constructor(user: User) {
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
    });
    this.email = user.email;
    this.name = user.name;
    this.family_name = user.family_name;
    this.username = user.username;
    this.gender = user.gender;
    this.avatar = user.avatar;
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

  async update(params: Array<keyof User>) {
    try {
      const data: UpdatedFields | {} = params.reduce((acc, key) => {
        //@ts-ignore
        acc[key] = this[key];
        return acc;
      }, {});

      const user = JSON.parse(
        //@ts-ignore
        await AsyncStorage.getItem('currentAuthenticatedUser'),
      );
      await AsyncStorage.setItem(
        'currentAuthenticatedUser',
        JSON.stringify({ ...user, ...data }),
      );
    } catch (error) {
      console.log('user update error', error);
    }
  }
}
