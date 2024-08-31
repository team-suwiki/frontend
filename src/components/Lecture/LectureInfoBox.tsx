import styled from '@emotion/styled';
import { Button } from 'components';
import { useNavigate } from 'react-router-dom';
import type { SetNumber, SetTeamNumber } from 'types/common';
import type { LectureDetailItem } from 'types/lecture';
import { floatFix } from 'utils/floatFix';

interface LectureInfoBoxProps {
  current: LectureDetailItem;
  isLogin?: boolean;
}

const LectureInfoBox = ({ current, isLogin = false }: LectureInfoBoxProps) => {
  const navigate = useNavigate();
  const teamSet = Math.floor(current.lectureTeamAvg ?? 0) as SetTeamNumber;
  const homeworkSet = Math.floor(current.lectureHomeworkAvg ?? 0) as SetNumber;
  const difficultySet = Math.floor(current.lectureDifficultyAvg ?? 0) as SetNumber;

  return (
    <Content id="top">
      <div style={{ filter: current.id === -1 ? 'blur(5px)' : undefined }}>
        <TitleWrapper id="top">
          <div>
            <SubWrapper>
              <Title>{current.lectureName}</Title>
            </SubWrapper>
            <SubWrapper>
              <Professor>
                {current.majorType} | {current.professor}
              </Professor>
            </SubWrapper>
            <TitleWrapper>
              {current.semesterList.split(', ').map((v) => {
                return (
                  <Option key={v} id="semester">
                    {v}
                  </Option>
                );
              })}
            </TitleWrapper>
          </div>
          <Option id="type">{current.lectureType}</Option>
        </TitleWrapper>
        <FlexContainer id="col">
          <WidthContainer>
            <FlexContainer id="between">
              <OptionTitle>꿀강지수</OptionTitle>
              <FlexContainer id="score">
                <Color
                  id="score"
                  style={{
                    color: '#336af8',
                    fontWeight: '500',
                  }}
                >
                  {floatFix(current.lectureHoneyAvg, 1)}
                  <span style={{ color: '#a3a3a3' }}>/5</span>
                </Color>
              </FlexContainer>
            </FlexContainer>
            <FlexContainer id="between">
              <OptionTitle>조모임</OptionTitle>
              <FlexContainer id="score">
                <Color style={{ color: '#6200ee', fontSize: '14px' }}>
                  {current.lectureHoneyAvg !== 0 ? (
                    team[teamSet]
                  ) : (
                    <DataColor id="black">-</DataColor>
                  )}
                </Color>
              </FlexContainer>
            </FlexContainer>
          </WidthContainer>
          <WidthContainer>
            <FlexContainer id="between">
              <OptionTitle>배움지수</OptionTitle>
              <FlexContainer id="score">
                <Color
                  id="score"
                  style={{
                    color: '#336af8',
                    fontWeight: '500',
                  }}
                >
                  {floatFix(current.lectureLearningAvg, 1)}
                  <span style={{ color: '#a3a3a3' }}>/5</span>
                </Color>
              </FlexContainer>
            </FlexContainer>
            <FlexContainer id="between">
              <OptionTitle>과제</OptionTitle>
              <FlexContainer id="score">
                <Color style={{ color: '#6200ee', fontSize: '14px' }}>
                  {current.lectureHoneyAvg !== 0 ? (
                    homework[homeworkSet]
                  ) : (
                    <DataColor id="black">-</DataColor>
                  )}
                </Color>
              </FlexContainer>
            </FlexContainer>
          </WidthContainer>
          <WidthContainer>
            <FlexContainer id="between">
              <OptionTitle>만족도</OptionTitle>
              <FlexContainer id="score">
                <Color
                  id="score"
                  style={{
                    color: '#336af8',
                    fontWeight: '500',
                  }}
                >
                  {floatFix(current.lectureSatisfactionAvg, 1)}
                  <span style={{ color: '#a3a3a3' }}>/5</span>
                </Color>
              </FlexContainer>
            </FlexContainer>
            <FlexContainer id="between">
              <OptionTitle>학점</OptionTitle>
              <FlexContainer id="score">
                <Color style={{ color: '#6200ee', fontSize: '14px' }}>
                  {current.lectureHoneyAvg !== 0 ? (
                    difficulty[difficultySet]
                  ) : (
                    <DataColor id="black">-</DataColor>
                  )}
                </Color>
              </FlexContainer>
            </FlexContainer>
          </WidthContainer>
        </FlexContainer>
      </div>
      {!isLogin && current.id ? (
        <FlexContainer id="needLogin">
          <div style={{ marginBottom: '10px' }}>
            강의정보 및 평가를 <br />
            확인하려면 로그인하세요.
          </div>
          <Button width="50%" color="#336af8" onClick={() => navigate('/login')}>
            로그인하기
          </Button>
        </FlexContainer>
      ) : null}
    </Content>
  );
};

export default LectureInfoBox;

const Content = styled.div`
  border-radius: 10px;
  margin: 10px 0;
  margin-bottom: 3rem;
  position: relative;
  &#top {
    padding: 1rem 2rem;
    border: 1px solid rgb(224, 224, 224);
    @media screen and (max-width: 550px) {
      padding: 1rem 1.5rem;
    }
  }
  &#loading {
    padding: 6rem 2rem;
    border: 1px solid rgb(224, 224, 224);
  }
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

const Color = styled.div`
  font-size: 16px;
  &#score {
    width: 60%;
    text-align: right;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  align-items: flex-end;

  &#top {
    justify-content: space-between;
    align-items: flex-start;
  }
  &#bottom {
    margin-top: 1rem;
  }
`;
const SubWrapper = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Title = styled.div`
  display: flex;
  font-size: 18px;
  text-align: center;
  &#sub {
    font-size: 1.5rem;
  }
`;

const Professor = styled.div`
  display: flex;
  color: #222;

  font-weight: 400;
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;

const Option = styled.div`
  border-radius: 12px;
  background-color: #eeeeee;
  text-align: center;
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding: 4.5px 12px;
  font-size: 14px;

  font-weight: 400;
  cursor: default;
  &#type {
    height: 25px;
    margin-top: 0px;
  }
  &#semester {
    margin-right: 8px;
  }
`;

const OptionTitle = styled.div`
  display: flex;
  color: #222222;
  align-items: flex-end;
  margin-left: 5px;
  width: 80px;
  font-size: 14px;

  font-weight: 400;
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  color: #a3a3a3;
  width: 45%;
  &#col {
    flex-direction: column;
  }
  &#needLogin {
    color: #222222;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 35%;
    left: 27%;
    text-align: center;
    line-height: 1.3;
    font-weight: 500;
    @media screen and (max-width: 550px) {
      left: 0%;
    }
  }
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

const WidthContainer = styled.div`
  align-items: flex-end;
  display: flex;
  margin: 10px;
  margin-left: 0px;
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

const team = {
  0: <DataColor id="cyan">없음</DataColor>,
  1: <DataColor id="purple">있음</DataColor>,
};
const homework = {
  0: <DataColor id="cyan">없음</DataColor>,
  1: <DataColor id="black">보통</DataColor>,
  2: <DataColor id="purple">많음</DataColor>,
};
const difficulty = {
  0: <DataColor id="cyan">너그러움</DataColor>,
  1: <DataColor id="black">보통</DataColor>,
  2: <DataColor id="purple">까다로움</DataColor>,
};
