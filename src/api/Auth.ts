import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
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
import { removeStorage, setStorage } from 'utils/loginStorage';

import { tokenState } from '../app/recoilStore';
import { http } from '../hooks/useHttp';

interface Errors {
  response: {
    data: {
      code: string;
      error: string;
      exception: string;
      message: string;
      status: number;
    };
  };
}

const Auth = () => {
  const setToken = useSetRecoilState(tokenState);
  const navigate = useNavigate();

  //회원가입
  const register = async (data: UserJoin) => {
    try {
      const res: AxiosResponseSuccess = await http.post('user/join', {
        loginId: data.loginId,
        password: data.password,
        email: data.email,
      });
      if (res.success) navigate('/emailsignup', { state: data.email });
    } catch (error) {
      const axiosError = error as Errors;
      alert(axiosError.response.data.message);
    }
  };

  //회원가입 아이디 중복확인
  const checkId = async (setIdCheck: (isId: boolean) => void, loginId: UserId) => {
    try {
      const res: ResponseUserCheckID = await http.post('user/check-id', loginId);
      setIdCheck(!res.overlap);
      if (!res.overlap) alert('사용가능합니다.');
      else alert('중복입니다.');
    } catch (error) {
      const axiosError = error as Errors;
      alert(axiosError.response.data.message);
    }
  };

  //회원가입 이메일 중복확인
  const checkEmail = async (setEmailCheck: (isEmail: boolean) => void, email: UserEmail) => {
    try {
      const res: ResponseUserCheckID = await http.post('user/check-email', email);
      setEmailCheck(!res.overlap);
      if (!res.overlap) alert('사용가능합니다.');
      else alert('중복입니다.');
    } catch (error) {
      const axiosError = error as Errors;
      alert(axiosError.response.data.message);
    }
  };

  //아이디 찾기
  const findId = async (email: UserEmail) => {
    try {
      const res: AxiosResponseSuccess = await http.post('user/find-id', email);
      if (res.success) alert('해당 이메일로 아이디를 전송하였습니다');
    } catch (error) {
      const axiosError = error as Errors;
      alert(axiosError.response.data.message);
    }
  };

  //비밀번호 찾기
  const findPw = async (data: FindPassword) => {
    try {
      const res: AxiosResponseSuccess = await http.post('user/find-pw', data);
      if (res.success) alert('해당 이메일로 임시 비밀번호를 발송하였습니다.');
    } catch (error) {
      const axiosError = error as Errors;
      alert(axiosError.response.data.message);
    }
  };

  //로그인 (로그인유지)
  const login = async (userLogin: UserLogin) => {
    try {
      const res: UserLoginResponse = await http.post('user/client-login', userLogin);
      setStorage('login', 'true');
      setToken(res.AccessToken);
      navigate('/');
    } catch (error) {
      const axiosError = error as Errors;
      alert(axiosError.response?.data?.message);
    }
  };

  //SUWIKI 비밀번호 변경
  const resetPassword = async (data: ResetPassword) => {
    try {
      const res: AxiosResponseSuccess = await http.post('user/reset-pw', data);
      if (res.success) {
        alert('비밀번호가 변경되었습니다\n다시 로그인 해주세요');
        removeStorage('login');
        navigate('/');
      }
    } catch (error) {
      const axiosError = error as Errors;
      alert(axiosError.response.data.message);
    }
  };

  //SUWIKI 회원 탈퇴
  const quit = async (login: UserLogin) => {
    try {
      const res: AxiosResponseSuccess = await http.post('user/quit', login);
      if (res.success) {
        alert('회원탈퇴가 완료되었습니다');
        removeStorage('login');
        navigate('/');
      }
    } catch (error) {
      const axiosError = error as Errors;
      alert(axiosError.response.data.message);
    }
  };

  return {
    register,
    checkId,
    checkEmail,
    login,
    findId,
    findPw,
    resetPassword,
    quit,
  };
};
export default Auth;
