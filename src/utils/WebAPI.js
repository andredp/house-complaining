// @flow
import axios from 'axios';

export default class WebAPI {
  static HOST = 'http://localhost:8080';

  static authenticate = (username: string, password: string): Promise<*> =>
    axios.post('/api/login', {
      username,
      password,
    });

  static init = () => {
    axios.defaults.baseURL = WebAPI.HOST;
    const token = localStorage.getItem('auth.token');
    if (token) {
      WebAPI.setAuthenticationToken(token);
    }
  };

  static setAuthenticationToken = (token) => {
    axios.defaults.headers.common.Authorization = token;
  };
}
