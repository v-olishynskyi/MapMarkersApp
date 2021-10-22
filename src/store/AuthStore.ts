import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, computed, makeObservable, observable } from 'mobx';

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
      isAuth: observable,
      setIsAuth: action,
      computedIsAuth: computed,

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

      fakeSignIn: action,
      fakeSignUp: action,
      fakeSignOut: action,

      clear: action,
    });
  }

  setIsAuth = (value: boolean) => {
    this.isAuth = value;
  };

  get computedIsAuth() {
    return this.isAuth;
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

  fakeSignIn = async () => {
    const { email, password } = this;
    let users: [{ email: string; password: string }] | null = JSON.parse(
      //@ts-ignore
      await AsyncStorage.getItem('users'),
    );

    console.log('users', users);

    if (!users) {
      throw new Error('UserNotExists');
    }

    const dbUser = users.find(user => user.email === email);

    if (!dbUser) {
      throw new Error('UserNotExists');
    }

    if (dbUser.password !== password) {
      throw new Error('IncorrectPassword');
    }

    await AsyncStorage.multiSet([
      ['isAuth', JSON.stringify(true)],
      ['currentAuthenticatedUser', JSON.stringify(dbUser)],
    ]);

    this.setIsAuth(true);
    console.log(
      await AsyncStorage.multiGet(
        ['isAuth', 'currentAuthenticatedUser'],
        (err, result) => {
          if (err) {
            console.log('erro', err);
            return;
          }
          console.log('RESULT', result);
        },
      ),
    );
  };

  fakeSignUp = async () => {
    try {
      const { email, password, name, family_name, username } = this;

      const data = { email, password, name, family_name, username };
      let users: [{ email: string; password: string }] | null = JSON.parse(
        //@ts-ignore
        await AsyncStorage.getItem('users'),
      );

      if (!users) {
        users = [{ ...data }];
        await AsyncStorage.setItem('users', JSON.stringify(users));

        await AsyncStorage.multiSet([
          ['currentAuthenticatedUser', JSON.stringify(data)],
          ['isAuth', JSON.stringify(true)],
        ]);
        return;
      }

      const usersEmails = users.map(user => user.email);

      if (usersEmails.includes(email)) {
        throw new Error('EmailExistsException');
      }

      await AsyncStorage.multiSet([
        ['users', JSON.stringify([...users, { ...data }])],
        ['currentAuthenticatedUser', JSON.stringify(data)],
        ['isAuth', JSON.stringify(true)],
      ]);

      //@ts-ignore
      console.log('USERS', JSON.parse(await AsyncStorage.getItem('users')));
    } catch (error) {
      console.log('error sign up', { error });
    }
  };

  fakeSignOut = async () => {
    this.setIsAuth(false);
    await AsyncStorage.multiSet([
      ['isAuth', JSON.stringify(false)],
      ['currentAuthenticatedUser', JSON.stringify(null)],
    ]);
  };
}
