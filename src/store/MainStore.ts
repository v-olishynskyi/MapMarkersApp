import { action, makeObservable, observable } from 'mobx';
import { UserModel } from '../models/UserModel';
import auth from '@react-native-firebase/auth';
import { Response, ResponseStatus } from '../types';
import { User } from '../models/models';
import { api } from '../api';
export class MainStore {
  user: UserModel | null = null;

  constructor() {
    makeObservable(this, {
      user: observable,
      setUser: action,

      getUserInstance: action,
    });
  }

  setUser = (user: UserModel) => {
    this.user = user;
  };

  checkCurrentUser() {
    return auth().currentUser;
  }

  getUserInstance = async () => {
    try {
      const currentUser = this.checkCurrentUser();

      if (currentUser) {
        const response: Response<User, 'user'> = await api.getUserByEmail(
          currentUser.email,
        );

        if (response.data.status === ResponseStatus.SUCCESS) {
          const responseUser = response.data.data.user;

          const user = new UserModel(responseUser);

          this.setUser(user);

          return true;
        }
      }
    } catch (error) {
      console.log('error getUserInstance', { error });
    }
  };
}
