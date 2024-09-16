import axios from 'axios';
import type { AxiosResponseSuccess } from 'types/common';
import type {
  FindPassword,
  ResetPassword,
  ResponseUserCheckID,
  UserEmail,
  UserId,
  UserJoin,
  UserLogin,
  UserLoginResponse,
} from 'types/user';
import { getRefreshToken } from 'utils/tokenManeger';

import { http } from '../hooks/useHttp';

const PROXY_URL = window.location.hostname === 'localhost' ? '/api' : '/proxy';

//회원가입
export const register = async (data: UserJoin) => {
  const res: AxiosResponseSuccess = await http.post('user/join', {
    loginId: data.loginId,
    password: data.password,
    email: data.email,
  });
  // if (res.success) navigate('/emailsignup', { state: data.email });

  return res;
};

//회원가입 아이디 중복확인
export const checkId = async (loginId: UserId) => {
  const res: ResponseUserCheckID = await http.post('user/check-id', loginId);
  // setIdCheck(!res.overlap);
  // if (!res.overlap) alert('사용가능합니다.');
  // else alert('중복입니다.');

  return res;
};

//회원가입 이메일 중복확인
export const checkEmail = async (email: UserEmail) => {
  const res: ResponseUserCheckID = await http.post('user/check-email', email);
  // setEmailCheck(!res.overlap);
  // if (!res.overlap) alert('사용가능합니다.');
  // else alert('중복입니다.');

  return res;
};

//아이디 찾기
export const findId = async (email: UserEmail) => {
  const res: AxiosResponseSuccess = await http.post('user/find-id', email);
  // if (res.success) alert('해당 이메일로 아이디를 전송하였습니다');

  return res;
};

//비밀번호 찾기
export const findPw = async (data: FindPassword) => {
  const res: AxiosResponseSuccess = await http.post('user/find-pw', data);
  // if (res.success) alert('해당 이메일로 임시 비밀번호를 발송하였습니다.');

  return res;
};

//로그인 (로그인유지)
export const login = async (userLogin: UserLogin) => {
  const res: UserLoginResponse = await http.post('user/login', userLogin);
  // setStorage('login', 'true');
  // setToken(res.AccessToken);
  // navigate('/');

  return res;
};

//SUWIKI 비밀번호 변경
export const resetPassword = async (data: ResetPassword) => {
  const res: AxiosResponseSuccess = await http.post('user/reset-pw', data);
  // if (res.success) {
  //   alert('비밀번호가 변경되었습니다\n다시 로그인 해주세요');
  //   removeStorage('login');
  //   navigate('/');
  // }

  return res;
};

//SUWIKI 회원 탈퇴
export const quit = async (login: UserLogin) => {
  const res: AxiosResponseSuccess = await http.post('user/quit', login);
  // if (res.success) {
  //   alert('회원탈퇴가 완료되었습니다');
  //   removeStorage('login');
  //   navigate('/');
  // }

  return res;
};

// useHttp 훅에서 사용되기 때문에 http대신 axios를 사용
export const refresh = async () => {
  const response = await axios.post<UserLoginResponse>('user/refresh', null, {
    baseURL: PROXY_URL,
    headers: {
      Authorization: getRefreshToken(),
    },
  });

  return response;
};
