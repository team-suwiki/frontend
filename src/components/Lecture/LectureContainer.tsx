import styled from '@emotion/styled';
import { FlexWrap } from 'styles/common';
import { LectureCard } from 'components';
import type { LectureDetailItem } from 'types/lecture';

const LectureContainer = ({ data }: { data?: LectureDetailItem[] }) => {
  const oddList = data?.filter((row, i) => !(i % 2) && row);
  const evenList = data?.filter((row, i) => i % 2 && row);

  return (
    <FlexWrap>
      <FlexWrapSub>
        {oddList?.map((row) => (
          <LectureCard key={row.id} row={row} />
        ))}
      </FlexWrapSub>
      <FlexWrapSub>
        {evenList?.map((row) => (
          <LectureCard key={row.id} row={row} />
        ))}
      </FlexWrapSub>
      <FullWrapSub>
        {data?.map((row) => (
          <LectureCard key={row.id} row={row} />
        ))}
      </FullWrapSub>
    </FlexWrap>
  );
};

export default LectureContainer;

const FlexWrapSub = styled.div`
  width: 49%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

const FullWrapSub = styled.div`
  display: none;
  @media screen and (max-width: 960px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;
