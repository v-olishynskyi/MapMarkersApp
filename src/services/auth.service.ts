import api from '@api';
import { LoginData, LoginResponse, RegistrationData } from './auth.model';

export class AuthService {
  public static async login(body: LoginData) {
    const { data } = await api.post<LoginResponse>('auth/sign-in', body);

    return data;
  }

  public static async registration(body: RegistrationData) {
    const { data } = await api.post('auth/sign-up', body);

    return data;
  }
}
