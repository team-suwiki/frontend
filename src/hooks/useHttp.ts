/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { TOKEN_KEY } from 'constants/auth';
import jwtDecode, { type JwtPayload } from 'jwt-decode';
import { useEffect } from 'react';
import { getAccessToken, setToken } from 'utils/tokenManeger';

import { logout, refresh } from '../api/etc';
import useUserStore from './useUserStore';

const PROXY_URL = window.location.hostname === 'localhost' ? '/api' : '/proxy';

const http = axios.create({
  withCredentials: true,
  baseURL: PROXY_URL,
});

const useHttp = () => {
  const { isLogin } = useUserStore();

  //액세스토큰 유효성 검사
  const isAccessTokenValid = async () => {
    const token = getAccessToken();
    if (!token) return false;
    const tokenInfo = jwtDecode<JwtPayload>(token);
    if (tokenInfo.exp && tokenInfo.exp <= Date.now() / 1000) return false;

    return true;
  };
  //토큰 리프레시
  const refreshingToken = async () => {
    try {
      const res = await refresh();
      if (res?.status !== 200) {
        throw new Error(`Response status is ${res?.status}`);
      } else {
        setToken(TOKEN_KEY, res.data.AccessToken);

        return res;
      }
    } catch (error) {
      console.error('refreshToken ERROR', error);
    }
  };

  const requestInterceptor = http.interceptors.request.use(
    async (config) => {
      const tokenValid = await isAccessTokenValid();
      if (!isLogin) {
        config.headers['Content-Type'] = 'application/json';
      } else if (isLogin && !tokenValid) {
        const result = await refreshingToken();
        if (!result) {
          alert('로그인 시간이 만료되었습니다\n다시 로그인 해주세요');
          await logout();
        }
        config.headers['Authorization'] = result?.data.AccessToken;
      } else {
        config.headers['Authorization'] = getAccessToken();
      }

      return config;
    },
    function (error) {
      alert('해당 요청이 정상적으로 이루어지지 않았어요.\n 다시 시도해주세요.');

      return Promise.reject(error);
    },
  );

  const responseInterceptor = http.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      if (error.response.status === 502) {
        location.href = '/502';
      }

      return Promise.reject(error);
    },
  );

  useEffect(() => {
    return () => {
      http.interceptors.request.eject(requestInterceptor);
      http.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);
};

export { http, useHttp };
