import env from '@env';
import { LoginData, LoginResponse, RegistrationData } from './auth.model';
import axios from 'axios';

const authApi = axios.create({ baseURL: env.BASE_URL });

authApi.interceptors.response.use(
  res => res,
  error => Promise.reject(error.response.data),
);

export class AuthService {
  public static async login(body: LoginData) {
    const { data } = await authApi.post<LoginResponse>('auth/sign-in', body);

    return data;
  }

  public static async registration(body: RegistrationData) {
    const { data } = await authApi.post('auth/sign-up', body);

    return data;
  }
}
