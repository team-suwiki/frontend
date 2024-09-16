import type { AxiosError } from 'axios';

import { http } from '../hooks/useHttp';
import type { NoticeDetail, NoticeItem } from '../types/notice';

//공지사항 조회 api
export const list = async (pageParam = 1) => {
  try {
    const res = await http.get<NoticeItem[]>(`/notice/all?page=${pageParam}`);

    return {
      data: res,
      nextPage: pageParam + 1,
      isLast: res.data.length < 10,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    alert(axiosError.message);
  }
};

//공지사항 자세히보기 api
export const detail = async (notice: string) => {
  try {
    const res = await http.get<NoticeDetail>(`/notice/?noticeId=${notice}`);

    return res;
  } catch (error) {
    const axiosError = error as AxiosError;
    alert(axiosError.message);
  }
};
