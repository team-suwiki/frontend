import styled from '@emotion/styled';
import type { UserEmail, UserId } from 'types/user';

interface UserAccountProps extends UserId, UserEmail {
  isLogin: boolean;
}

const UserAccount = ({ loginId, email, isLogin }: UserAccountProps) => {
  return (
    <Content id="top">
      <div style={{ filter: !isLogin ? 'blur(6px)' : 'none' }}>
        <Title id="top">내 계정</Title>

        <FlexContainer>
          <OptionTitle id="my">로그인 아이디</OptionTitle>
          <FlexContainer>{loginId}</FlexContainer>
        </FlexContainer>
        <FlexContainer>
          <OptionTitle id="my">학교 인증 메일</OptionTitle>
          <FlexContainer>{email}</FlexContainer>
        </FlexContainer>
      </div>
      {!isLogin && (
        <FlexContainer id="needLogin">
          내가 쓴 글과 포인트를
          <br />
          확인하려면 로그인하세요
        </FlexContainer>
      )}
    </Content>
  );
};

export default UserAccount;

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
