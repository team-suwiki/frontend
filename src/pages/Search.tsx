import styled from '@emotion/styled';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { Lecture } from 'api';
import { LectureList, LectureSearch, MajorSelect, OptionSelect } from 'components';
import { sortOptions } from 'constants/placeholderData';
import useRouter from 'hooks/useRouter';

const Search = () => {
  const lecture = Lecture();
  const { query } = useRouter();

  const value = query.searchValue || '';
  const option = query.option || 'modifiedDate';
  const major = query.majorType || '';

  const search = useInfiniteQuery({
    queryKey: ['search', value, option, major],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => lecture.search(value, pageParam, option, major),
    getNextPageParam: (lastPage) => (lastPage && !lastPage.isLast ? lastPage.nextPage : undefined),
    placeholderData: keepPreviousData,
  });

  const count = search.data?.pages[0]?.data.count ?? 0;

  return (
    <div>
      <Container>
        <LectureSearch />
        <SearchResultWrapper>
          <div style={{ display: 'flex' }}>
            <FlexWrapper>
              <MajorSelect />
            </FlexWrapper>
            <FlexWrapper>
              <OptionSelect list={sortOptions} itemTitle="sub" location="search" />
            </FlexWrapper>
          </div>

          <FlexWrapper id="count">
            총 <Color> {count}</Color>건
          </FlexWrapper>
        </SearchResultWrapper>

        <HeadSelection>
          <LectureList />
        </HeadSelection>
      </Container>
    </div>
  );
};

export default Search;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: 0 auto;
  @media only screen and (max-width: 960px) {
    width: 90%;
  }
`;

const SearchResultWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 0.5rem;
  justify-content: space-between;
  align-items: center;
`;

const HeadSelection = styled.div`
  padding-bottom: 10px;
  width: 100%;
`;

const FlexWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
  &#count {
    margin-right: 0;
    @media screen and (max-width: 960px) {
      display: none;
    }
  }
`;

const Color = styled.span`
  color: #336af8;
  margin-left: 6px;
  text-align: center;
`;
