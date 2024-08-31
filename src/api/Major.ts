import type { AxiosError } from 'axios';
import type { VersionCheckSuccess } from 'types/common';

import JwtInterceptors from './ApiController';

const Major = () => {
  const { instance } = JwtInterceptors();

  // 버전체크
  const version = async () => {
    try {
      const res: VersionCheckSuccess = await instance.get('/suwiki/version');

      return res;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.message);
    }
  };

  // 전공 리스트
  const type = async () => {
    try {
      const res = await instance.get('/suwiki/majorType');

      return res;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.message);
    }
  };

  // 즐겨찾기 리스트
  const searchFavorite = async () => {
    try {
      const res = await instance.get('/user/favorite-major');

      return res;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.message);
    }
  };

  //전공 즐겨찾기 하기 api
  const favoriting = async (majorType: string) => {
    try {
      const res = await instance.post('/user/favorite-major', { majorType });

      return res;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.status === 500) {
        alert('로그인 후 이용해주세요');
      }
    }
  };

  //즐겨찾기 삭제 api
  const unfavoriting = async (majorType: string) => {
    return instance({
      url: `/user/favorite-major?majorType=${majorType}`,
      method: 'delete',
    }).catch((error) => {
      const axiosError = error as AxiosError;
      if (axiosError.status === 500) {
        alert('로그인 후 이용해주세요');
      }
    });
  };

  return { favoriting, unfavoriting, version, searchFavorite, type };
};

export default Major;
