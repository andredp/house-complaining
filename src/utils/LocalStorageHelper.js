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

// Auth Token
export function getAuthToken(): ?string {
  return getItem('auth_token');
}
export function setAuthToken(token: string) {
  setItem('auth_token', token);
}
export function removeAuthToken() {
  removeItem('auth_token');
}
