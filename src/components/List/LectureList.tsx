import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { Lecture } from 'api';
import { LectureContainer } from 'components';
import { fakeLectureList } from 'constants/placeholderData';
import useRouter from 'hooks/useRouter';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FlexWrap } from 'styles/common';

const LectureList = () => {
  const lecture = Lecture();
  const { query } = useRouter();
  const { ref, inView } = useInView();

  const value = query.searchValue || '';
  const option = query.option || 'modifiedDate';
  const major = query.majorType || '';

  const { data, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['search', value, option, major],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => lecture.search(value, pageParam, option, major),
    getNextPageParam: (lastPage) => (lastPage && !lastPage.isLast ? lastPage.nextPage : undefined),
    placeholderData: keepPreviousData,
  });

  const count = data?.pages[0]?.data.count ?? 0;

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return count ? (
    <>
      {data?.pages?.map((page, index) => <LectureContainer key={index} data={page?.data.data} />)}
      <div ref={ref} style={{ marginBottom: '10px' }}>
        {isFetchingNextPage ? <LectureContainer data={fakeLectureList} /> : null}
      </div>
    </>
  ) : (
    <FlexWrap id="none">{value}에 대한 검색결과가 없습니다</FlexWrap>
  );
};

export default LectureList;
