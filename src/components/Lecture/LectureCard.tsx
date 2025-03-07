import styled from '@emotion/styled';
import { StarRating } from 'components/common';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { LectureDetailItem } from 'types/lecture';
import { floatFix } from 'utils/floatFix';
import { subStr } from 'utils/subString';

const Detail = ({
  lectureSatisfactionAvg,
  lectureHoneyAvg,
  lectureLearningAvg,
}: Pick<
  LectureDetailItem,
  'lectureHoneyAvg' | 'lectureLearningAvg' | 'lectureSatisfactionAvg'
>) => {
  return (
    <div>
      <StarFlex id="top">
        <FlexContainer id="col">
          <StarFlex id="between">
            만족도
            <PaddingRight />
            <Rate id="modal">{floatFix(lectureSatisfactionAvg, 1)}</Rate>
          </StarFlex>
        </FlexContainer>
        <FlexContainer id="col">
          <StarFlex id="between">
            꿀강지수
            <PaddingRight />
            <Rate id="modal">{floatFix(lectureHoneyAvg, 1)}</Rate>
          </StarFlex>
        </FlexContainer>
        <FlexContainer id="col">
          <StarFlex id="between">
            배움지수
            <PaddingRight />
            <Rate id="modal">{floatFix(lectureLearningAvg, 1)}</Rate>
          </StarFlex>
        </FlexContainer>
      </StarFlex>
    </div>
  );
};

const LectureCard = ({ row }: { row: LectureDetailItem }) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const title = subStr(row.lectureName, 14);

  const handleClick = (id: number) => {
    if (id !== -1) navigate(`/lectureinfo?id=${id}`);
  };

  return (
    <LectureWrapper onClick={() => handleClick(row.id)}>
      <div style={{ filter: row.id === -1 ? 'blur(4px)' : undefined }}>
        <MarginTop>
          <TitleWrapper>
            <Title>{title}</Title>
            <Option>{row.lectureType}</Option>
          </TitleWrapper>
          <Professor>
            {row.majorType} | {row.professor}
          </Professor>
          <RateWrapper>
            <StarRating rating={row.lectureTotalAvg} />
            <Rate>{floatFix(row.lectureTotalAvg, 1)}</Rate>
            <Minute
              onClick={(e) => {
                setModal(!modal);
                e.stopPropagation();
              }}
            >
              {modal ? '간략히' : '자세히'}
            </Minute>
          </RateWrapper>
        </MarginTop>
      </div>
      {modal && (
        <Detail
          lectureSatisfactionAvg={row.lectureSatisfactionAvg}
          lectureHoneyAvg={row.lectureHoneyAvg}
          lectureLearningAvg={row.lectureLearningAvg}
        />
      )}
    </LectureWrapper>
  );
};

export default LectureCard;

const Minute = styled.span`
  font-size: 12px;
  color: #515151;
  text-decoration: underline;
  padding-left: 6px;
  font-weight: 400;

  &:hover {
    cursor: pointer;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-weight: 500;
`;

const Title = styled.div`
  display: flex;
  font-size: 1.1rem;
`;

const Professor = styled.div`
  display: flex;
  color: #b8bdc8;
  font-size: 14px;
  margin: 0.3rem 0;

  font-weight: 400;
`;

const Option = styled.div`
  display: flex;
  border-radius: 10px;
  background-color: rgb(239, 239, 239);
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 500;
`;

const RateWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-top: 14px;
`;

const Rate = styled.span`
  color: #336af8;
  font-size: 18px;
  font-weight: 500;
  padding-left: 4px;
  &#modal {
    font-size: 16px;
    padding-left: 0px;
  }
`;

const LectureWrapper = styled.div`
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 10px;
  cursor: pointer;
`;

const MarginTop = styled.div`
  padding: 14px 24px;
`;

const StarFlex = styled.div`
  display: flex;
  align-items: center;
  padding-right: 1rem;
  padding: 6px 12px;
  font-size: 13px;
  &#top {
    border-top: 1px solid #e0e0e0;
  }
  &#bottom {
  }
  &#between {
    justify-content: space-between;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  &#col {
    flex-direction: column;
  }
`;

const PaddingRight = styled.span`
  padding-right: 0.7rem;
`;
