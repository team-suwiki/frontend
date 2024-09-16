import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { list } from 'api/Notice';
import { Spinner } from 'components';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const Notice = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['notice'],
    queryFn: () => list(),
    getNextPageParam: (lastPage) => {
      if (lastPage && !lastPage.isLast) return lastPage.nextPage;

      return undefined;
    },
    initialData: undefined,
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <AppContainer>
      <AppTitle>공지사항</AppTitle>
      {isLoading || data === undefined ? (
        <Spinner id="notice" />
      ) : data.pages.length === 0 ? (
        <NoNotice>아직 공지사항이 없어요.</NoNotice>
      ) : (
        <NoticeUl>
          {data.pages.map((page) =>
            page?.data.data.map((notice) => (
              <NoticeWrap
                key={notice.id}
                onClick={() => navigate(`/notice/detail?id=${notice.id}`)}
              >
                <Title>{notice.title}</Title>
                <Option>{notice.modifiedDate.slice(0, 10)}</Option>
              </NoticeWrap>
            )),
          )}
          <li ref={ref} style={{ marginBottom: '10px' }}>
            {isFetchingNextPage ? <Spinner /> : null}
          </li>
        </NoticeUl>
      )}
    </AppContainer>
  );
};

export default Notice;

const AppContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: 0 auto;
  padding-bottom: 5rem;

  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    margin: 0 auto;
  }
`;

const AppTitle = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 600;
  padding-top: 5rem;
  padding-bottom: 1rem;
`;

const Title = styled.div`
  display: flex;
  font-size: 1rem;
  margin-right: 0.7rem;
`;

const Option = styled.div`
  border-radius: 10px;
  padding: 0.5rem 0;
  font-size: 0.8rem;
  color: #a3a3a3;
  font-weight: 300;
`;

const NoticeUl = styled.ul`
  width: 100%;
`;

const NoticeWrap = styled.li`
  width: 100%;
  border: 1.5px solid #f1f1f1;
  padding: 1.5rem 1.5rem;
  border-radius: 10px;
  margin-top: 2vh;

  &:hover {
    cursor: pointer;
  }
`;

const NoNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
