const USERNAME_KEY = "USERNAME";
const PASSWORD_KEY = "PASSWORD";
const TOKEN = "USER_TOKEN";

export function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}

export function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}

export function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN, token);
}
export function getToken() {
  return localStorage.getItem(TOKEN) || "";
}
export function removeToken() {
  localStorage.removeItem(TOKEN);
}
