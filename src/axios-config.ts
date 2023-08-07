import axios, { AxiosError } from 'axios';
import env from '@env';
import * as Keychain from 'react-native-keychain';
import { AuthService } from '@services';

const api = axios.create({ baseURL: `${env.BASE_URL}api/v1` });

let isAlreadyFetchingNewToken = false;
let failedRequests: any[] = [];
const addFailedRequest = callback => failedRequests.push(callback);
const rerunFailedRequests = (newToken: string) => {
  failedRequests.reverse().forEach(callback => callback(newToken));
};

api.interceptors.request.use(
  async request => {
    // @ts-ignore
    const credentials = await Keychain.getGenericPassword();

    if (!credentials) {
      return request;
    }

    const authTokens = JSON.parse(credentials.password);

    if (authTokens?.accessToken) {
      // @ts-ignore
      request.headers = {
        ...request.headers,
        Authorization: `Bearer ${authTokens.accessToken}`,
      };
    }

    return request;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  (error: AxiosError<any>) => {
    const { response, config } = error;
    console.log('ERROR', response?.data, JSON.stringify(error, null, 2));

    const refreshToken = async () => {
      if (!isAlreadyFetchingNewToken) {
        try {
          isAlreadyFetchingNewToken = true;
          const credentials = await Keychain.getInternetCredentials(
            'refresh_tkn',
          );

          if (!credentials) {
            throw new Error('No refresh token provided');
          }

          const tokens = JSON.parse(credentials.password);

          const { access_token } = await AuthService.refreshAccessToken(
            tokens.refreshToken,
          );

          rerunFailedRequests(access_token);
        } catch (error) {
        } finally {
          failedRequests = [];
          isAlreadyFetchingNewToken = false;
        }
      }
    };

    if (response?.data?.error === 'expired_token') {
      refreshToken();

      return new Promise(resolve => {
        addFailedRequest(newToken => {
          const originalRequest = { ...config };
          originalRequest!.headers!.Authorization = `Bearer ${newToken}`;
          resolve(axios(originalRequest));
        });
      });
    }

    return Promise.reject(response?.data);
  },
);

export default api;
