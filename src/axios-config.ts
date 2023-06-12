import axios from 'axios';
import env from '@env';
import * as Keychain from 'react-native-keychain';

const api = axios.create({ baseURL: `${env.BASE_URL}api/v1` });

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
  error => {
    return Promise.reject(error.response.data);
  },
);

export default api;
