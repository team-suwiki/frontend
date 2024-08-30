import { tokenState } from 'app/recoilStore';
import axios from 'axios';
import jwtDecode, { type JwtPayload } from 'jwt-decode';
import { useRecoilState } from 'recoil';
import { isLoginStorage } from 'utils/loginStorage';
import { logout, refresh } from './etc';

const PROXY_URL = window.location.hostname === 'localhost' ? '/api' : '/proxy';
axios.defaults.withCredentials = true;

const JwtInterceptors = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const instance = axios.create({
    baseURL: `${PROXY_URL}`,
  });

  //액세스토큰 유효성 검사
  const isAccessTokenValid = async () => {
    if (!token) return false;
    const tokenInfo = await jwtDecode<JwtPayload>(token);
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

  instance.interceptors.request.use(
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
    }
  );

  instance.interceptors.response.use(
    function (response) {
      return response.data;
    },
    async (error) => {
      if (error.response.status === 502) {
        location.href = '/502';
      }
      return Promise.reject(error);
    }
  );
  return { instance };
};

export default JwtInterceptors;
