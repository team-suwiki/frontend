import styled from '@emotion/styled';
import type { SetNumber, SetTeamNumber } from 'types/common';
import type { Review } from 'types/evaluate';
import { floatFix } from 'utils/floatFix';

const team = {
  0: { color: 'cyan', text: '없음' },
  1: { color: 'purple', text: '있음' },
};
const homework = {
  0: { color: 'cyan', text: '없음' },
  1: { color: 'black', text: '보통' },
  2: { color: 'purple', text: '많음' },
};
const difficulty = {
  0: { color: 'cyan', text: '너그러움' },
  1: { color: 'black', text: '보통' },
  2: { color: 'purple', text: '까다로움' },
};

interface EvaluationDetailProps {
  lecture: Review;
}

const EvaluationDetail = ({ lecture }: EvaluationDetailProps) => {
  const teamSet = team[lecture.team as SetTeamNumber];
  const homeworkSet = homework[lecture.homework as SetNumber];
  const difficultySet = difficulty[lecture.difficulty as SetNumber];

  return (
    <StarFlex id="top">
      <FlexContainer id="col">
        <StarFlex id="between">
          만족도
          <PaddingRight />
          <Rate id="modal">{floatFix(lecture.satisfaction, 1)}</Rate>
        </StarFlex>
        <StarFlex id="between">
          조모임 <DataColor id={teamSet.color}> {teamSet.text}</DataColor>
        </StarFlex>
      </FlexContainer>
      <FlexContainer id="col">
        <StarFlex id="between">
          꿀강 지수
          <PaddingRight />
          <Rate id="modal">{floatFix(lecture.honey, 1)}</Rate>
        </StarFlex>
        <StarFlex id="between">
          과제 <DataColor id={homeworkSet.color}> {homeworkSet.text}</DataColor>
        </StarFlex>
      </FlexContainer>
      <FlexContainer id="col">
        <StarFlex id="between">
          배움 지수
          <PaddingRight />
          <Rate id="modal">{floatFix(lecture.learning, 1)}</Rate>
        </StarFlex>
        <StarFlex id="between">
          학점 <DataColor id={difficultySet.color}> {difficultySet.text}</DataColor>
        </StarFlex>
      </FlexContainer>
    </StarFlex>
  );
};

export default EvaluationDetail;

const StarFlex = styled.div`
  display: flex;
  align-items: flex-end;
  padding-right: 1rem;
  padding: 5px 12px;
  font-size: 13px;
  &#top {
    padding: 8px 12px 0px 12px;
  }
  &#bottom {
    padding: 0px 12px 8px 12px;
  }
  &#between {
    justify-content: space-between;
    font-weight: 300;
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

const Rate = styled.span`
  color: #336af8;

  font-size: 18px;
  font-weight: 500;
  padding-left: 5px;
  &#modal {
    font-size: 16px;
    padding-left: 0px;
  }
`;

const DataColor = styled.div`
  &#black {
    color: black;
  }
  &#cyan {
    color: #336af8;
  }
  &#purple {
    color: #6200ee;
  }
`;
