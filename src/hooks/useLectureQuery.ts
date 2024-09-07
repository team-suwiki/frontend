import { Lecture } from 'api';
import { lectureState } from 'app/recoilStore';
import { CACHE_TIME } from 'constants/cacheTime';
import type { Category } from 'pages/LectureInfo';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isLoginStorage } from 'utils/loginStorage';

const useLectureQuery = () => {
  const [searchParams] = useSearchParams();
  const setLectureInfo = useSetRecoilState(lectureState);
  const lecture = Lecture();
  const searchValue = searchParams.get('q') || '';
  const selectId = searchParams.get('id') || '';
  const option = searchParams.get('option') || 'modifiedDate';
  const majorType = searchParams.get('majorType') || '전체';
  const major = majorType === '전체' ? '' : majorType;
  const value = searchValue === 'all' ? '' : searchValue;
  const selectCategory = (searchParams.get('category') as Category) || '강의평가';
  const isLogin = isLoginStorage();

  const getMainLecture = useQuery(['main', option, major], () => lecture.main(option, 1, major), {
    keepPreviousData: true,
    suspense: true,
  });

  const { ref: searchRef, inView: searchInView } = useInView();
  const search = useInfiniteQuery(
    ['search', value, option, major],
    ({ pageParam = 1 }) => lecture.search(value, pageParam, option, major),
    {
      getNextPageParam: (lastPage) =>
        lastPage && !lastPage.isLast ? lastPage.nextPage : undefined,
      keepPreviousData: true,
    },
  );

  const detail = useQuery(['lecture', 'detail', selectId], () => lecture.detail(selectId), {
    cacheTime: CACHE_TIME.MINUTE_0,
    staleTime: CACHE_TIME.MINUTE_0,
    enabled: isLogin && selectId !== '',
    onSuccess: (lecture) => {
      setLectureInfo({
        id: Number(selectId),
        lectureName: lecture!.data.lectureName,
        professor: lecture!.data.professor,
        semesterList: lecture!.data.semesterList,
        selectedSemester: '선택',
        satisfaction: 0.5,
        honey: 0.5,
        learning: 0.5,
        team: 0,
        homework: 0,
        difficulty: 0,
        examInfo: '',
        examType: '선택',
        examDifficulty: '',
        content: '',
        majorType: '',
        totalAvg: 0,
      });
    },
  });

  const { ref: evaluationRef, inView: evaluationInView } = useInView();
  const evaluation = useInfiniteQuery(
    ['lecture', 'evaluationList', selectId],
    ({ pageParam = 1 }) => lecture.evaluation(selectId, pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage && !lastPage.isLast ? lastPage.nextPage : undefined,
      cacheTime: CACHE_TIME.MINUTE_0,
      staleTime: CACHE_TIME.MINUTE_0,
      enabled: isLogin && selectId !== '' && selectCategory === '강의평가',
    },
  );

  const { ref: testInfoRef, inView: testInfoInView } = useInView();
  const testInfo = useInfiniteQuery(
    ['lecture', 'examList', selectId],
    ({ pageParam = 1 }) => lecture.examInfo(selectId, pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage && !lastPage.isLast ? lastPage.nextPage : undefined,
      cacheTime: CACHE_TIME.MINUTE_0,
      staleTime: CACHE_TIME.MINUTE_0,
      enabled: isLogin && selectId !== '' && selectCategory === '시험정보',
    },
  );

  useEffect(() => {
    if (searchInView) {
      search.fetchNextPage();
    }
  }, [searchInView, search.fetchNextPage, search]);

  useEffect(() => {
    if (evaluationInView && isLogin) {
      evaluation.fetchNextPage();
    }
  }, [evaluationInView, evaluation.fetchNextPage, isLogin, evaluation]);

  useEffect(() => {
    if (testInfoInView && isLogin) {
      testInfo.fetchNextPage();
    }
  }, [testInfoInView, testInfo.fetchNextPage, isLogin, testInfo]);

  return {
    getMainLecture,
    search: {
      data: search.data,
      searchLoading: search.isLoading,
      nextLoading: search.isFetchingNextPage,
      value,
      ref: searchRef,
    },
    detail,
    evaluation: {
      data: evaluation.data,
      isFetchingNextPage: evaluation.isFetchingNextPage,
      isLoading: evaluation.isLoading,
      ref: evaluationRef,
    },
    testInfo: {
      data: testInfo.data,
      isFetchingNextPage: testInfo.isFetchingNextPage,
      isLoading: testInfo.isLoading,
      ref: testInfoRef,
    },
  };
};

export default useLectureQuery;
