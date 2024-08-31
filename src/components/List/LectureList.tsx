import { LectureContainer } from 'components';
import { fakeLectureList } from 'constants/placeholderData';
import useLectureQuery from 'hooks/useLectureQuery';
import { FlexWrap } from 'styles/common';
import type { MainLecture } from 'types/lecture';

interface LectureListProps {
  pages:
    | (
        | {
            data: MainLecture;
            isLast: boolean;
            nextPage: number;
          }
        | undefined
      )[]
    | undefined;
  count: number;
}

const LectureList = ({ count, pages }: LectureListProps) => {
  const { search } = useLectureQuery();
  const { nextLoading, value, ref } = search();

  return count ? (
    <>
      {pages?.map((page, index) => <LectureContainer key={index} data={page?.data.data} />)}
      <div ref={ref} style={{ marginBottom: '10px' }}>
        {nextLoading ? <LectureContainer data={fakeLectureList} /> : null}
      </div>
    </>
  ) : (
    <FlexWrap id="none">{value}에 대한 검색결과가 없습니다</FlexWrap>
  );
};

export default LectureList;
