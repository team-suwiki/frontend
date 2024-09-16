import type { AxiosResponseSuccess } from 'types/common';
import type { Review } from 'types/evaluate';
import type { MyExam } from 'types/exam';
import type {
  BlacklistInfo,
  EvaluatePostCreate,
  EvaluatePostUpdate,
  EvaluateReportCreate,
  ExamPostCreate,
  ExamPostPurChase,
  ExamPostUpdate,
  ExamReportCreate,
  RestrictionInfo,
  UserProfileInfo,
} from 'types/user';

import { http } from '../hooks/useHttp';
import { queryClient } from '../main';

export const info = async () => {
  const data: UserProfileInfo = await http.get('/user/my-page');

  return data;
};

// 내가 쓴 글 - 강의평가
export const evaluateList = async (pageParam = 1) => {
  const { data } = await http.get<Review[]>(`/evaluate-posts/written/?page=${pageParam}`);

  return {
    data,
    isLast: data.length < 10,
    nextPage: pageParam + 1,
  };
};

// 내가 쓴 글 - 시험정보
export const examInfoList = async (pageParam = 1) => {
  const { data } = await http.get<MyExam[]>(`/exam-posts/written/?page=${pageParam}`);

  return {
    data,
    isLast: data.length < 10,
    nextPage: pageParam + 1,
  };
};

// 시험 정보 구매이력
export const purchasedTestInfo = () => {
  return http.get<ExamPostPurChase[]>('/exam-posts/purchase');
};

// 밴 사유 리스트
export const banList = async () => {
  const data: BlacklistInfo[] = await http.get('user/blacklist-reason');

  return data;
};

// 제재 사유 리스트
export const resList = async () => {
  const data: RestrictionInfo[] = await http.get('user/restricted-reason');

  return data;
};

// 강의 평가 수정
export const updateEvaluation = async (id: string, data: EvaluatePostUpdate) => {
  const res = await http.put(`/evaluate-posts/?evaluateIdx=${id}`, data);
  if (res) {
    alert('수정 완료');
    queryClient.invalidateQueries({ queryKey: ['myInfo', 'myEvaluation'] });
  }
};

// 강의 평가 작성
export const writeEvaluation = async (id: string, data: EvaluatePostCreate) => {
  const res = await http.post(`/evaluate-posts/?lectureId=${id}`, data);
  if (res) {
    alert('작성 완료');
    queryClient.invalidateQueries({ queryKey: ['lecture', 'evaluationList', id] });
    queryClient.invalidateQueries({ queryKey: ['lecture', 'detail', id] });
    queryClient.invalidateQueries({ queryKey: ['myInfo'] });
  }
};

// 강의 평가 삭제
export const deleteEvaluation = async (id: string) => {
  const res = await http.delete(`/evaluate-posts/?evaluateIdx=${id}`);
  if (res) {
    alert('삭제 완료');
    queryClient.invalidateQueries({ queryKey: ['myInfo'] });
  }
};

// 강의 평가 신고
export const reportEvaluation = async (data: EvaluateReportCreate) => {
  const res = await http.post('/user/report/evaluate', data);
  if (res) {
    alert('신고 완료');
  }
};

// 시험 정보 신고
export const reportExamInfo = async (data: ExamReportCreate) => {
  const res = await http.post('/user/report/exam', data);
  if (res) {
    alert('신고 완료');
  }
};

// 시험 정보 쓰기
export const writeExamInfo = async (id: string, data: ExamPostCreate) => {
  const res = await http.post(`/exam-posts/?lectureId=${id}`, data);
  if (res) {
    alert('작성 완료');
    queryClient.invalidateQueries({ queryKey: ['lecture', 'examList', id] });
    queryClient.invalidateQueries({ queryKey: ['lecture', 'detail', id] });
    queryClient.invalidateQueries({ queryKey: ['myInfo'] });
  }
};

// 시험 정보 구매
export const buyTestInfo = async (id: string) => {
  const res: AxiosResponseSuccess = await http.post(`/exam-posts/purchase/?lectureId=${id}`);
  if (res.success) {
    alert('구매 완료');
    queryClient.invalidateQueries({ queryKey: ['lecture', 'examList', id] });
  }
};

// 시험 정보 수정
export const UpdateExamInfo = async (id: string, data: ExamPostUpdate) => {
  const res = await http.put(`/exam-posts/?examIdx=${id}`, data);
  if (res) {
    alert('수정 완료');
    queryClient.invalidateQueries({ queryKey: ['myInfo', 'myExamInfo'] });
  }
};

// 시험 정보 삭제
export const deleteExamInfo = async (id: string) => {
  const res = await http.delete(`/exam-posts/?examIdx=${id}`);
  if (res) {
    alert('삭제 완료');
    queryClient.invalidateQueries({ queryKey: ['myInfo'] });
  }
};
