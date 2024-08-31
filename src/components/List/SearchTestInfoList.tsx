import styled from '@emotion/styled';
import { User } from 'api';
import type { ExamPost } from 'types/exam';

interface SearchTestInfoListProps {
  page: ExamPost[];
  isLogin: boolean;
}

export type ExamDiff = '매우 쉬움' | '쉬움' | '보통' | '어려움' | '매우 어려움';

const SearchTestInfoList = ({ page, isLogin }: SearchTestInfoListProps) => {
  return (
    <>
      {page.map((lecture) => (
        <div key={lecture.id} style={{ filter: !isLogin ? 'blur(10px)' : undefined }}>
          <Subject lecture={lecture} />
        </div>
      ))}
    </>
  );
};

export const Subject = ({ lecture }: { lecture: ExamPost }) => {
  const user = User();
  const examDifficultySet = lecture.examDifficulty;
  const onReport = () => {
    if (window.confirm('정말 신고하시겠어요? \n*허위 신고 시 제재가 가해질 수 있습니다!'))
      user.reportExamInfo({ examIdx: lecture.id, content: lecture.content });
  };
  const examDifficulty = {
    '매우 쉬움': <DataColor id="cyan">매우 쉬움</DataColor>,
    쉬움: <DataColor id="cyan">쉬움</DataColor>,
    보통: <DataColor>보통</DataColor>,
    어려움: <DataColor id="purple">어려움</DataColor>,
    '매우 어려움': <DataColor id="purple">매우 어려움</DataColor>,
  };

  return (
    <div style={{ marginTop: '15px' }}>
      <LectureWrapper>
        <MarginTop id="top">
          <TitleWrapper>
            <YearText>{lecture.selectedSemester}</YearText>
            <YearText>{lecture.examType}</YearText>
          </TitleWrapper>
          <EditButton onClick={onReport}>신고</EditButton>
          <div style={{ marginBottom: '35px' }} />
        </MarginTop>

        <div>
          <StarFlex id="top">
            <FlexContainer id="col">
              <StarFlex id="between">
                난이도
                <StarFlex id="data">{examDifficulty[examDifficultySet as ExamDiff]}</StarFlex>
              </StarFlex>
            </FlexContainer>
            <FlexContainer id="col">
              <StarFlex id="between">
                시험유형
                <StarFlex id="black">{lecture.examInfo}</StarFlex>
              </StarFlex>
            </FlexContainer>
          </StarFlex>
        </div>

        <MarginTop id="bottom">
          <EvaluationDetail>
            {lecture.content.split('\n').map((value, index) => (
              <div key={index}>
                {value}
                <br />
              </div>
            ))}
          </EvaluationDetail>
        </MarginTop>
      </LectureWrapper>
    </div>
  );
};

export default SearchTestInfoList;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  float: left;
  align-items: center;
`;

const LectureWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const MarginTop = styled.div`
  &#top {
    padding: 14px 24px 0px 24px;
  }
  &#bottom {
    padding: 0px 24px 14px 24px;
    margin-top: 5px;
  }
`;
const DataColor = styled.div`
  font-weight: 500;
  &#cyan {
    color: #336af8;
  }
  &#purple {
    color: #6200ee;
  }
`;

const StarFlex = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 11px;

  font-weight: 300;
  font-size: 13px;
  @media screen and (max-width: 550px) {
    font-size: 12px;
    padding: 2px 10px;
  }
  &#top {
    padding: 8px 12px 0px 12px;
  }
  &#bottom {
    padding: 0px 12px 8px 12px;
  }
  &#between {
    justify-content: space-between;
  }
  &#black {
    font-weight: 500;
  }
  &#data {
    padding-right: 0px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  &#col {
    flex-direction: column;
  }
`;

const YearText = styled.span`
  font-weight: 400;
  font-size: 14px;
  padding: 4.5px 13px 4.5px 13px;
  border-radius: 12.5px;
  background-color: #eee;
  margin-right: 12px;
`;

const EvaluationDetail = styled.div`
  word-break: break-all;
  display: flex;
  flex-direction: column;

  font-weight: 400;
  line-height: 1.3;
  font-size: 1rem;
  padding-top: 0.7rem;
`;

const EditButton = styled.span`
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: #a3a3a3;
  float: right;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`;
