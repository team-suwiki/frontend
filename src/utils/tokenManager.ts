import { REFRESH_KEY, TOKEN_KEY } from 'constants/auth';

const localStorage = window.localStorage;

export const setToken = (key: typeof TOKEN_KEY | typeof REFRESH_KEY, token: string) => {
  localStorage.setItem(key, token);
};

export const removeToken = (key: typeof TOKEN_KEY | typeof REFRESH_KEY) => {
  localStorage.removeItem(key);
};

export const removeTokenAll = () => {
  removeToken(TOKEN_KEY);
  removeToken(REFRESH_KEY);
};

export const getAccessToken = () => localStorage.getItem(TOKEN_KEY);

export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);
