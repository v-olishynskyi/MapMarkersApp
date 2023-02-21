import { action, makeAutoObservable, observable } from 'mobx';

export type FirebaseAuthErrorsCode =
  | 'auth/invalid-email'
  | 'auth/user-not-found'
  | 'auth/email-already-in-use'
  | 'auth/wrong-password'
  | 'auth/too-many-requests';

export type AvailableErrorCodes = FirebaseAuthErrorsCode;

export default class ErrorStore {
  errorCode: AvailableErrorCodes | null = null;

  constructor() {
    makeAutoObservable(this, {
      errorCode: observable,

      setErrorCode: action,
    });
  }

  setErrorCode = (errorCode: AvailableErrorCodes) => {
    this.errorCode = errorCode;
  };
}
