import { REFRESH_KEY, TOKEN_KEY } from 'constants/auth';

const localstroage = window.localStorage;

export const setToken = (key: typeof TOKEN_KEY | typeof REFRESH_KEY, token: string) => {
  localstroage.setItem(key, token);
};

export const removeToken = (key: typeof TOKEN_KEY | typeof REFRESH_KEY) => {
  localstroage.removeItem(key);
};

export const removeTokenAll = () => {
  removeToken(TOKEN_KEY);
  removeToken(REFRESH_KEY);
};

export const getAccessToken = () => localstroage.getItem(TOKEN_KEY);

export const getRefreshToken = () => localstroage.getItem(REFRESH_KEY);
