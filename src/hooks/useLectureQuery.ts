import { Lecture } from 'api';
import { lectureState } from 'app/recoilStore';
import { CACHE_TIME } from 'constants/cacheTime';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isLoginStorage } from 'utils/loginStorage';

// 애러가 날 수 있는 hook
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

  const isLogin = isLoginStorage();

  // 메인 쿼리(key: 정렬,전공)
  const { data: getMainLecture } = useQuery(
    ['main', option, major],
    () => lecture.main(option, 1, major),
    { keepPreviousData: true, suspense: true }
  );

  // 검색 쿼리(key: 검색어,정렬,전공)
  const Search = () => {
    const { ref, inView } = useInView();
    const {
      data,
      isLoading: searchLoading,
      fetchNextPage: getNextSearch,
      isFetchingNextPage: nextLoading,
    } = useInfiniteQuery(
      ['search', value, option, major],
      ({ pageParam = 1 }) => lecture.search(value, pageParam, option, major),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage && !lastPage.isLast) return lastPage.nextPage;
          return undefined;
        },
        keepPreviousData: true,
      }
    );
    useEffect(() => {
      if (inView) {
        getNextSearch();
      }
    }, [inView, getNextSearch]);
    return { data, searchLoading, nextLoading, value, ref };
  };

  // 강의 상세 쿼리(key: 강의id)
  const Detail = () => {
    const { data, isLoading } = useQuery(
      ['lecture', 'detail', selectId],
      () => lecture.detail(selectId),
      {
        cacheTime: CACHE_TIME.MINUTE_0,
        staleTime: CACHE_TIME.MINUTE_0,
        enabled: isLogin,
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
      }
    );
    return { data, isLoading, isLogin: isLogin };
  };

  // 강의평가 쿼리(key: 강의id)
  const Evaluation = (id: string, setWritten: any) => {
    const { ref, inView } = useInView();
    const { data, isFetchingNextPage, isLoading, fetchNextPage } = useInfiniteQuery(
      ['lecture', 'evaluationList', id],
      ({ pageParam = 1 }) => lecture.evaluation(id, pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage && !lastPage.isLast) return lastPage.nextPage;
          return undefined;
        },
        onSuccess: (data) => setWritten(data.pages[0]!.data),
        cacheTime: CACHE_TIME.MINUTE_0,
        staleTime: CACHE_TIME.MINUTE_0,
        enabled: isLogin,
      }
    );
    useEffect(() => {
      if (inView && isLogin) {
        fetchNextPage();
      }
    }, [inView, fetchNextPage]);
    return { data, isFetchingNextPage, isLoading, ref };
  };

  // 시험정보 쿼리(key: 강의id)
  const TestInfo = (id: string, setWritten: any) => {
    const { ref, inView } = useInView();
    const { data, isFetchingNextPage, isLoading, fetchNextPage } = useInfiniteQuery(
      ['lecture', 'examList', id],
      ({ pageParam = 1 }) => lecture.examInfo(id, pageParam),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage && !lastPage.isLast) return lastPage.nextPage;
          return undefined;
        },
        onSuccess: (data) => setWritten(data.pages[0]!.data),
        cacheTime: CACHE_TIME.MINUTE_0,
        staleTime: CACHE_TIME.MINUTE_0,
        enabled: isLogin,
      }
    );
    useEffect(() => {
      if (inView && isLogin) {
        fetchNextPage();
      }
    }, [inView, fetchNextPage]);
    return { data, isFetchingNextPage, isLoading, ref };
  };

  return { getMainLecture, Search, Detail, Evaluation, TestInfo };
};

export default useLectureQuery;
