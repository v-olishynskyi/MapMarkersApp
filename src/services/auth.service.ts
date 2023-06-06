import api from '@api';
import { LoginData, LoginResponse } from './auth.model';

export class AuthService {
  public static async login({ email, password }: LoginData) {
    const { data } = await api.post<LoginResponse>('auth/sign-in', {
      email,
      password,
    });

    return data;
  }
}
