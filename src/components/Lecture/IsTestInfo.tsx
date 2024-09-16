import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { examInfo } from 'api/Lecture';
import { buyTestInfo } from 'api/User';
import { Button, SearchTestInfoList, Spinner } from 'components';
import { CACHE_TIME } from 'constants/cacheTime';
import { fakeEvaluationList } from 'constants/placeholderData';
import useRouter from 'hooks/useRouter';
import useUserStore from 'hooks/useUserStore';
import type { Category } from 'pages/LectureInfo';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const IsTestInfo = () => {
  const { isLogin } = useUserStore();
  const { query } = useRouter();
  const { ref, inView } = useInView();

  const selectCategory = (query.category as Category) || '강의평가';
  const selectId = query.id || '';

  const { data, isLoading, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['lecture', 'examList', selectId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => examInfo(selectId, pageParam),
    getNextPageParam: (lastPage) => (lastPage && !lastPage.isLast ? lastPage.nextPage : undefined),
    gcTime: CACHE_TIME.MINUTE_0,
    staleTime: CACHE_TIME.MINUTE_0,
    enabled: isLogin && selectId !== '' && selectCategory === '시험정보',
  });

  useEffect(() => {
    if (inView && isLogin) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isLogin]);

  if (!isLogin) {
    return <SearchTestInfoList page={fakeEvaluationList} isLogin={false} />;
  }

  if (isLoading || !data || !data.pages[0]) return <Spinner />;

  const listLength = data.pages[0].data.data.length;
  const written = data?.pages[0].data.written;

  if (listLength === 0) {
    return written ? <NotUsePoint selectId={selectId} /> : <NoTestInfo />;
  }

  return (
    <>
      {data.pages.map((page) => {
        if (page) {
          return <SearchTestInfoList isLogin={isLogin} key={page.nextPage} page={page.data.data} />;
        }
      })}
      <div ref={ref} style={{ marginBottom: '10px' }}>
        {isFetchingNextPage && <Spinner id="nextPage" />}
      </div>
    </>
  );
};

export default IsTestInfo;

const NotUsePoint = ({ selectId }: { selectId: string }) => {
  const unlock = () => window.confirm('시험정보를 열람하시겠습니까?') && buyTestInfo(selectId);

  return (
    <Wrapper>
      <Content>
        시험 정보 열람시
        <br />
        <Color> 20 포인트</Color>가 차감됩니다.
      </Content>
      <BtWidth>
        <Button color="#336af8" onClick={unlock}>
          포인트 사용하기 (-20P)
        </Button>
      </BtWidth>
    </Wrapper>
  );
};

const NoTestInfo = () => (
  <Wrapper>
    <Content>등록된 시험정보가 없어요</Content>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
`;

const Color = styled.span`
  color: #336af8;
`;

const Content = styled.div`
  font-size: 1.5rem;
  margin: 2rem 0;

  font-weight: 600;
  text-align: center;
  margin-top: 10rem;
  @media screen and (max-width: 550px) {
    font-size: 1rem;
  }
`;

const BtWidth = styled.div`
  margin: 0 auto;
  width: 30%;

  @media only screen and (max-width: 550px) {
    width: 70%;
  }
`;
