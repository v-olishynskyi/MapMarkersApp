import auth from '@react-native-firebase/auth';
import { action, computed, makeObservable, observable } from 'mobx';
import { api } from '../api';
import { User } from '../models/models';
import { Response } from '../types';

interface IOnSignIn {
  email: string;
  password: string;
}

export default class AuthStore {
  isAuth: boolean = false;

  username: string = '';
  name: string = '';
  family_name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor() {
    makeObservable(this, {
      username: observable,
      setUsername: action,

      name: observable,
      setName: action,

      family_name: observable,
      setFamilyName: action,

      email: observable,
      setEmail: action,

      password: observable,
      setPassword: action,

      confirmPassword: observable,
      setConfirmPassword: action,

      userData: computed,
      _isAuth: computed,

      signIn: action,
      signUp: action,
      signOut: action,

      clear: action,
    });
  }

  get _isAuth() {
    return auth().currentUser;
  }

  setName = (name: string) => {
    this.name = name;
  };

  setFamilyName = (family_name: string) => {
    this.family_name = family_name;
  };

  setUsername = (username: string) => {
    this.username = username;
  };

  setEmail = (email: string) => {
    this.email = email.toLowerCase();
  };

  setPassword = (password: string) => {
    this.password = password;
  };

  setConfirmPassword = (password: string) => {
    this.confirmPassword = password;
  };

  get userData() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };
  }

  clear = () => {
    this.username = '';
    this.name = '';
    this.family_name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  };

  checkIfUserExist = async (userEmail?: string) => {
    const email = userEmail || this.email;
    const result = await auth().fetchSignInMethodsForEmail(email);
    if (result.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  signIn = async () => {
    return await auth().signInWithEmailAndPassword(this.email, this.password);
  };

  signUp = async () => {
    const { email, password, name, family_name, username } = this;

    const firebaseAuthResult = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );

    const body = {
      email,
      password,
      name,
      family_name,
      username,
      email_verified: firebaseAuthResult.user.emailVerified,
    };

    const result: Response<User, 'user'> = await api.signUp(body);

    console.log('RESULT', result.data.data);

    return result.data.data;
  };

  signOut = async () => {
    await auth().signOut();
    await api.signOut();
  };
}
