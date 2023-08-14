import { authApi } from '@api';
import {
  LoginData,
  LoginResponse,
  RefreshTokenResponse,
  RegistrationData,
} from './auth.model';

export class AuthService {
  public static async login(body: LoginData) {
    const { data } = await authApi.post<LoginResponse>('auth/sign-in', body);

    return data;
  }

  public static async registration(body: RegistrationData) {
    const { data } = await authApi.post('auth/sign-up', body);

    return data;
  }

  public static async refreshAccessToken(refreshToken: string) {
    const { data } = await authApi.post<RefreshTokenResponse>('auth/refresh', {
      refresh_token: refreshToken,
    });

    return data;
  }

  public static async logout(sessionId: string) {
    const { data } = await authApi.post('auth/logout', {
      session_id: sessionId,
    });

    return data;
  }
}
