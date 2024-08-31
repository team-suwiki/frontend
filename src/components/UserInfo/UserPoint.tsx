import styled from '@emotion/styled';
import type { UserProfileInfo } from 'types/user';

interface UserPointProps {
  my: UserProfileInfo;
  isLogin: boolean;
}

const UserPoint = ({ my, isLogin }: UserPointProps) => {
  return (
    <Content>
      <div style={{ filter: !isLogin ? 'blur(6px)' : 'none' }}>
        <TitleFlex>
          <Title id="top">현재 보유 포인트</Title>
          <OptionPoint id="mypoint">{my.point}p</OptionPoint>
        </TitleFlex>

        <FlexContainer>
          <OptionTitle>작성한 강의평가</OptionTitle>
          <FlexContainer id="last">
            <Color>{my.writtenEvaluation}</Color>개
          </FlexContainer>
          <OptionPoint id="plus">+{my.writtenEvaluation * 10}</OptionPoint>
        </FlexContainer>
        <FlexContainer>
          <OptionTitle>작성한 시험정보</OptionTitle>
          <FlexContainer id="last">
            <Color>{my.writtenExam}</Color>개
          </FlexContainer>
          <OptionPoint id="plus">+{my.writtenExam * 20}</OptionPoint>
        </FlexContainer>
        <FlexContainer>
          <OptionTitle>시험정보 열람 횟수</OptionTitle>
          <FlexContainer id="last">
            <Color id="p">{my.viewExam}</Color>개
          </FlexContainer>
          <OptionPoint id="minus">-{my.viewExam * 20}</OptionPoint>
        </FlexContainer>
      </div>
    </Content>
  );
};

export default UserPoint;

const Content = styled.div`
  border-radius: 10px;
  border: 1px solid rgb(224, 224, 224);
  padding: 1rem 1.8rem;
  margin: 10px 0;
  position: relative;
  &#top {
    width: 100%;
    margin-right: 2rem;
  }
`;
const Title = styled.div`
  font-size: 1.2rem;
  padding-bottom: 1rem;

  font-weight: 600;

  &#top {
    padding-bottom: 2rem;
  }
`;

const TitleFlex = styled.div`
  display: flex;
  color: #222222;
`;

const OptionTitle = styled.div`
  display: flex;
  width: 160px;
  @media screen and (max-width: 550px) {
    font-size: 0.9rem;
  }

  &#my {
    color: #222222;
  }

  &#text {
    width: 100%;
    margin-bottom: 10px;
  }

  &#points {
    width: 170px;
  }
`;

const OptionPoint = styled.div`
  display: flex;
  width: 36px;

  justify-content: flex-end;
  margin-left: auto;
  color: #336af8;
  &#minus {
    color: #6200ee;
  }
  &#mypoint {
    font-size: 1.2rem;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: #a3a3a3;
  padding-bottom: 0.5rem;

  @media screen and (max-width: 550px) {
    font-size: 0.9rem;
  }
  &#use {
    padding: 6px 0;
  }
  &#needLogin {
    color: #222222;
    position: absolute;
    top: 45%;
    left: 40%;
    text-align: center;
    line-height: 1.3;
    font-weight: 500;
    @media screen and (max-width: 550px) {
      left: 30%;
    }
  }
  &#col {
    display: flex;
    justify-content: center;
    @media screen and (max-width: 550px) {
      width: 90%;
    }
  }
  &#last {
    color: #222222;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Color = styled.span`
  color: #336af8;

  font-size: 1.2rem;
  @media screen and (max-width: 550px) {
    font-size: 0.9rem;
  }

  &#p {
    color: #6200ee;
  }

  &#ppp {
    color: #6200ee;
  }
`;
