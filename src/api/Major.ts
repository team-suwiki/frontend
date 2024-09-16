import type { VersionCheckSuccess } from 'types/common';

import { http } from '../hooks/useHttp';

export const version = async () => {
  const res: VersionCheckSuccess = await http.get('/suwiki/version');

  return res;
};

// 전공 리스트
export const type = async () => {
  const res = await http.get('/suwiki/majorType');

  return res;
};

// 즐겨찾기 리스트
export const searchFavorite = async () => {
  const res = await http.get('/user/favorite-major');

  return res;
};

//전공 즐겨찾기 하기 api
export const favoriting = async (majorType: string) => {
  const res = await http.post('/user/favorite-major', { majorType });

  return res;
};

//즐겨찾기 삭제 api
export const unfavoriting = async (majorType: string) => {
  return http({
    url: `/user/favorite-major?majorType=${majorType}`,
    method: 'delete',
  });
};
