import type { AxiosError } from 'axios';
import type { ReviewResponse } from 'types/evaluate';
import type { ExamPostsResponse } from 'types/exam';
import type { LectureDetailItem, MainLecture } from 'types/lecture';

import JwtInterceptors from './ApiController';

const Lecture = () => {
  const { instance } = JwtInterceptors();

  // 메인페이지
  const main = async (lecture = 'modifiedDate', page = 1, majorType = '') => {
    try {
      const data: MainLecture = await instance.get(
        `/lecture/all/?option=${lecture}&page=${page}&majorType=${majorType}`,
      );

      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.message);
    }
  };

  // 통합검색결과
  //꿀강순[modifiedDate, lectureSatisfactionAvg, lectureHoneyAvg, lectureLearningAvg]
  const search = async (
    searchValue = '{교수이름or과목이름}',
    pageParam = 1,
    option = 'modifiedDate',
    major: string,
  ) => {
    try {
      const data: MainLecture = await instance.get(
        `/lecture/search/?searchValue=${searchValue}&option=${option}&page=${pageParam}&majorType=${major}`,
      );

      return {
        data,
        isLast: data.data.length < 10,
        nextPage: pageParam + 1,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.message);
    }
  };

  // 검색 결과 자세히보기 (Lecture)
  const detail = (selectId: string) => {
    try {
      return instance.get<LectureDetailItem>(`/lecture/?lectureId=${selectId}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.message);
    }
  };

  // 검색 결과 자세히보기 (Evaluation)
  const evaluation = async (selectId: string, pageParam = 1) => {
    try {
      const { data, written }: ReviewResponse = await instance.get(
        `/evaluate-posts/?lectureId=${selectId}&page=${pageParam}`,
      );

      return {
        data: data,
        written: written,
        isLast: data.length < 10,
        nextPage: pageParam + 1,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.message);
    }
  };

  // 검색 결과 자세히보기 (Exam)
  const examInfo = async (selectId: string, pageParam = 1) => {
    try {
      const data: ExamPostsResponse = await instance.get(
        `/exam-posts/?lectureId=${selectId}&page=${pageParam}`,
      );

      return {
        data,
        written: data.written,
        isLast: data.data.length < 10,
        nextPage: pageParam + 1,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.message);
    }
  };

  return { main, search, evaluation, examInfo, detail };
};

export default Lecture;
