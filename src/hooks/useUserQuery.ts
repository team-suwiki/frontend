import { User } from 'api';
import { CACHE_TIME } from 'constants/cacheTime';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { isLoginStorage } from 'utils/loginStorage';

const useUserQuery = () => {
  const user = User();
  // 내가 작성한 평가
  const EvaluationList = () => {
    const { ref, inView } = useInView();
    const { data, isLoading, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
      ['myInfo', 'myEvaluation'],
      () => user.evaluateList(),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage && !lastPage.isLast) return lastPage.nextPage;

          return undefined;
        },
        enabled: isLoginStorage(),
        cacheTime: CACHE_TIME.MINUTE_30,
        staleTime: CACHE_TIME.MINUTE_30,
      }
    );
    useEffect(() => {
      if (inView) {
        fetchNextPage();
      }
    }, [inView, fetchNextPage]);

    return { data, isLoading, isFetchingNextPage, ref };
  };

  // 내가 작성한 시험정보
  const TestInfoList = () => {
    const { ref, inView } = useInView();
    const { data, isLoading, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
      ['myInfo', 'myExamInfo'],
      () => user.examInfoList(),
      {
        getNextPageParam: (lastPage) => {
          if (lastPage && !lastPage.isLast) return lastPage.nextPage;

          return undefined;
        },
        enabled: isLoginStorage(),
        cacheTime: CACHE_TIME.MINUTE_30,
        staleTime: CACHE_TIME.MINUTE_30,
      }
    );
    useEffect(() => {
      if (inView) {
        fetchNextPage();
      }
    }, [inView, fetchNextPage]);

    return { data, isLoading, isFetchingNextPage, ref };
  };

  return { EvaluationList, TestInfoList };
};
export default useUserQuery;
