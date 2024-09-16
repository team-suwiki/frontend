/* eslint-disable react-hooks/exhaustive-deps */
import { tokenState } from 'app/recoilStore';
import axios from 'axios';
import jwtDecode, { type JwtPayload } from 'jwt-decode';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isLoginStorage } from 'utils/loginStorage';

import { logout, refresh } from '../api/etc';

const PROXY_URL = window.location.hostname === 'localhost' ? '/api' : '/proxy';

const http = axios.create({
  withCredentials: true,
  baseURL: PROXY_URL,
});

const useHttp = () => {
  const [token, setToken] = useRecoilState(tokenState);

  //액세스토큰 유효성 검사
  const isAccessTokenValid = async () => {
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
        setToken(res.data.AccessToken);

        return res;
      }
    } catch (error) {
      console.error('refreshToken ERROR', error);
    }
  };

  const requestInterceptor = http.interceptors.request.use(
    async (config) => {
      const tokenValid = await isAccessTokenValid();
      const isLogin = isLoginStorage();
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
        config.headers['Authorization'] = token;
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
