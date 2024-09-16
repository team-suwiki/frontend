import type { ReviewResponse } from 'types/evaluate';
import type { ExamPostsResponse } from 'types/exam';
import type { LectureDetailItem, MainLecture } from 'types/lecture';

import { http } from '../hooks/useHttp';

export const main = async (lecture = 'modifiedDate', page = 1, majorType = '') => {
  const data: MainLecture = await http.get(
    `/lecture/all/?option=${lecture}&page=${page}&majorType=${majorType}`,
  );

  return data;
};

// 통합검색결과
//꿀강순[modifiedDate, lectureSatisfactionAvg, lectureHoneyAvg, lectureLearningAvg]
export const search = async (
  searchValue = '{교수이름or과목이름}',
  pageParam = 1,
  option = 'modifiedDate',
  major: string,
) => {
  const data: MainLecture = await http.get(
    `/lecture/search/?searchValue=${searchValue}&option=${option}&page=${pageParam}&majorType=${major}`,
  );

  return {
    data,
    isLast: data.data.length < 10,
    nextPage: pageParam + 1,
  };
};

// 검색 결과 자세히보기 (Lecture)
export const detail = (selectId: string) => {
  return http.get<LectureDetailItem>(`/lecture/?lectureId=${selectId}`);
};

// 검색 결과 자세히보기 (Evaluation)
export const evaluation = async (selectId: string, pageParam = 1) => {
  const { data, written }: ReviewResponse = await http.get(
    `/evaluate-posts/?lectureId=${selectId}&page=${pageParam}`,
  );

  return {
    data: data,
    written: written,
    isLast: data.length < 10,
    nextPage: pageParam + 1,
  };
};

// 검색 결과 자세히보기 (Exam)
export const examInfo = async (selectId: string, pageParam = 1) => {
  const data: ExamPostsResponse = await http.get(
    `/exam-posts/?lectureId=${selectId}&page=${pageParam}`,
  );

  return {
    data,
    written: data.written,
    isLast: data.data.length < 10,
    nextPage: pageParam + 1,
  };
};
