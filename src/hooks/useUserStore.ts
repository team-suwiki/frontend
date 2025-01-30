import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi, refresh as refreshApi } from 'api/Auth';
import { isLoginState } from 'atom/recoilStore';
import type { AxiosError } from 'axios';
import { REFRESH_KEY, TOKEN_KEY } from 'constants/auth';
import { useLocation } from 'react-router';
import { useRecoilState } from 'recoil';
import type { APIErrorResponse } from 'types/common';
import type { UserLogin } from 'types/user';
import { removeTokenAll, setToken } from 'utils/tokenManeger';

import useRouter from './useRouter';

const useUserStore = () => {
  const queryClient = useQueryClient();

  const { push } = useRouter();
  const { state } = useLocation();

  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const { mutateAsync: login } = useMutation({
    mutationFn: (formData: UserLogin) => loginApi(formData),
    onSuccess: (data) => {
      if (data) {
        setToken(TOKEN_KEY, data.AccessToken);
        setToken(REFRESH_KEY, data.RefreshToken);
        setIsLogin(true);
        if (state) {
          push(state.from);

          return;
        }
        push('/');
      }
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      if (error.response) alert(error.response.data.message);
    },
  });

  const logout = () => {
    queryClient.clear();
    removeTokenAll();
    setIsLogin(false);
    push('/');
  };

  const { mutateAsync: refresh } = useMutation({
    mutationFn: refreshApi,
    onSuccess: ({ data }) => {
      if (data) {
        setToken(TOKEN_KEY, data.AccessToken);
        setToken(REFRESH_KEY, data.RefreshToken);
        setIsLogin(true);
      }
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      if (error.response) alert('세션이 만료되었습니다. 다시 로그인해주세요.');
      logout();
    },
  });

  return { login, logout, refresh, isLogin };
};

export default useUserStore;
