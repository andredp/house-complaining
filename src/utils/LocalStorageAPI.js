// @flow
function getItem(key) {
  try {
    const item = localStorage.getItem(key);
    return item && JSON.parse(item);
  } catch (error) {
    // TODO: log !?
    return undefined;
  }
}

function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // TODO: log !?
  }
}

function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    // TODO: log !?
  }
}

export default class LocalStorageAPI {
  // Auth Token
  static getAuthToken(): ?string {
    return getItem('auth.token');
  }
  static setAuthToken(token: string) {
    setItem('auth.token', token);
  }
  static removeAuthToken() {
    removeItem('auth.token');
  }
}
