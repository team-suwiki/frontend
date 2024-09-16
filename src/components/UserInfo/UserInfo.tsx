import styled from '@emotion/styled';
import { UserAccount, UserPoint } from 'components';
import { fakeUserInfo } from 'constants/placeholderData';
import useUserStore from 'hooks/useUserStore';
import { useNavigate } from 'react-router-dom';
import type { UserProfileInfo } from 'types/user';

interface UserInfoProps {
  my: UserProfileInfo;
}

const UserInfo = ({ my }: UserInfoProps) => {
  const navigate = useNavigate();
  const { isLogin } = useUserStore();

  const handleNavigate = () => {
    if (isLogin) {
      navigate('/myposting');
    } else {
      navigate('/login');
    }
  };

  const optionSlice = (start: number, end: number) => {
    return option.slice(start, end).map(({ title, page }) => (
      <FlexContainer id="use" key={title}>
        <FlexContainer id="last" onClick={() => navigate(`/${page}`)}>
          {title}
        </FlexContainer>
      </FlexContainer>
    ));
  };

  return (
    <Container>
      <InfoWrapper>
        <InfoTitle>내 정보</InfoTitle>
      </InfoWrapper>

      <Wrapper id="top">
        <Button id="mobile" onClick={handleNavigate}>
          {isLogin ? '내가 쓴 글' : '로그인하기'}
        </Button>
        <UserAccount
          isLogin={isLogin}
          loginId={isLogin ? my.loginId : fakeUserInfo.blurLoginId}
          email={isLogin ? my.email : fakeUserInfo.blurEmail}
        />

        <Button id="pc" onClick={handleNavigate}>
          {isLogin ? '내가 쓴 글' : '로그인하기'}
        </Button>
      </Wrapper>

      <Wrapper>
        <UserPoint my={isLogin ? my : fakeUserInfo} isLogin={isLogin} />
      </Wrapper>

      <Wrapper>
        <Content>
          <Title>포인트 제도 안내</Title>
          <OptionTitle id="text">
            - 포인트는 강의평가 서비스 내에서만 이용되는 제도입니다.
            <br />- 다른 계정으로 학교 인증 시 해당 계정으로 포인트가 합산 되며, 기존 계정의
            포인트는 초기화 됩니다.
            <br />- 포인트 획득을 위해 허위/중복/성의없는 정보를 작성할 경우, 서비스 이용이 영구
            제한될 수 있습니다.
            <br />- 허위 신고를 남용하는 이용자 또한 제재가 가해질 수 있습니다.
          </OptionTitle>
          <br />
          <br />

          <Title>포인트 획득</Title>
          <FlexPointContainer>
            -강의평 작성:
            <Color id="pp">+10P</Color>
          </FlexPointContainer>
          <FlexPointContainer>
            -시험정보 공유:
            <Color id="pp">+20P</Color>
          </FlexPointContainer>
          <FlexPointContainer>
            -신고 보상:
            <Color id="pp">+1P</Color>
          </FlexPointContainer>

          <br />
          <br />
          <Title>포인트 차감</Title>
          <FlexPointContainer>
            -시험정보 조회:
            <Color id="ppp">-20P</Color>
          </FlexPointContainer>
          <FlexPointContainer>
            -강의평가/시험정보 삭제:
            <Color id="ppp">-30P</Color>
          </FlexPointContainer>
        </Content>
      </Wrapper>
      <Wrapper>
        <Content>
          <Title>이용 안내</Title>
          {isLogin && optionSlice(0, 2)}
          {urlOption.map(({ title, page }) => (
            <FlexContainer id="use" key={title}>
              <FlexContainer id="last" onClick={() => window.open(page)}>
                {title}
              </FlexContainer>
            </FlexContainer>
          ))}
          {isLogin && optionSlice(2, 4)}
        </Content>
      </Wrapper>
    </Container>
  );
};

export default UserInfo;

const option = [
  {
    title: '이용 제한 내역',
    page: 'banreason',
  },
  {
    title: '구매이력',
    page: 'historytest',
  },
  {
    title: '비밀번호 변경',
    page: 'resetpassword',
  },
  {
    title: '회원 탈퇴',
    page: 'exit',
  },
];
const urlOption = [
  {
    title: '피드백 전송',
    page: 'https://forms.gle/tZByKoN6rJCysvNz6',
  },
  {
    title: '문의하기',
    page: 'https://alike-pump-ae3.notion.site/SUWIKI-2cd58468e90b404fbd3e30b8b2c0b699',
  },
  {
    title: '이용약관',
    page: 'https://sites.google.com/view/suwiki-policy-terms/',
  },
  {
    title: '개인정보 처리 방침',
    page: 'https://sites.google.com/view/suwiki-policy-privacy',
  },
  {
    title: '오픈소스 라이선스',
    page: '',
  },
];

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;

  &#top {
    display: flex;
    @media screen and (max-width: 550px) {
      flex-direction: column;
    }
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: 0 auto;

  font-weight: 400;
  @media only screen and (max-width: 960px) {
    width: 90%;
  }
`;
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

const FlexPointContainer = styled.div`
  display: flex;
  color: #515151;
  padding-bottom: 0.5rem;
`;

const Button = styled.button`
  margin: 10px 0;
  width: 30%;
  padding: 0 1rem;
  border: none;
  background: #336af8;
  color: white;
  text-align: center;
  font-size: 1.5rem;

  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  &#mobile {
    display: none;
  }
  @media only screen and (max-width: 960px) {
    font-size: 1.3rem;
  }
  @media only screen and (max-width: 550px) {
    margin: 10px 0;
    width: 100%;
    height: 48px;
    &#mobile {
      display: block;
    }
    &#pc {
      display: none;
    }
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 1rem 0;
`;

const InfoTitle = styled.div`
  display: flex;
  font-size: 1.5rem;

  font-weight: 600;
  padding-top: 4rem;
  padding-bottom: 1rem;
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
