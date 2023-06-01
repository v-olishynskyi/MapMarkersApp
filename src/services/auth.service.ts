import { wait } from '@utils/helpers';
import { LoginData } from './auth.model';

export class AuthService {
  public static async login(body: LoginData) {
    await wait(4000);
    return Promise.resolve({ token: `${body.email}-${body.password}` });
  }
}
