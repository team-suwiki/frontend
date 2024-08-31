import styled from '@emotion/styled';
import { Notice as Notices } from 'api';
import { Spinner } from 'components';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { type NoticeItem } from 'types/notice';

const Item = ({ notice }: { notice: NoticeItem }) => {
  const navigate = useNavigate();
  const toDetail = () => navigate(`/notice/detail?id=${notice.id}`);

  return (
    <NoticeWrap onClick={toDetail}>
      <Title>{notice.title}</Title>
      <Option>{notice.modifiedDate.slice(0, 10)}</Option>
    </NoticeWrap>
  );
};

export const NoticeContainer = () => {
  const notice = Notices();
  const { ref, inView } = useInView();
  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['notice'],
    () => notice.list(),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage && !lastPage.isLast) return lastPage.nextPage;
      },
    },
  );
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  if (isLoading || data === undefined) return <Spinner id="notice" />;
  if (data.pages.length === 0) return <NoNotice>아직 공지사항이 없어요.</NoNotice>;

  return (
    <>
      {data.pages.map((page, index) => (
        <Fragment key={index}>
          {page?.data.data.map((notice) => <Item key={notice.id} notice={notice} />)}
        </Fragment>
      ))}
      <div ref={ref} style={{ marginBottom: '10px' }}>
        {isFetchingNextPage ? <Spinner /> : null}
      </div>
    </>
  );
};

const Notice = () => {
  return (
    <AppContainer>
      <AppTitle>공지사항</AppTitle>
      <NoticeContainer />
    </AppContainer>
  );
};

export default Notice;

const AppContainer = styled.div`
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

const NoticeWrap = styled.div`
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
