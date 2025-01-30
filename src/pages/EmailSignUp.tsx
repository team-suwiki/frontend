import styled from '@emotion/styled';
import { Button } from 'components';
import { useLocation, useNavigate } from 'react-router';
import { Positioner } from 'styles/common';

const EmailSignUp = () => {
  const navigate = useNavigate();
  const { state }: { state: string } = useLocation();

  return (
    <Positioner>
      <Wrapper>
        <Title>이메일 인증</Title>
        <Img>
          <img src="images/email.png" alt="options" width={100} />
        </Img>
        <Content>
          <Color>{state}</Color>로<br />
          전송된 인증 메일을 확인해주세요
          <br />
          <br />
          <br />
          메일 인증 후 수위키 서비스 이용이 가능합니다.
        </Content>

        <Button onClick={() => navigate('/')}>메인으로</Button>
      </Wrapper>
    </Positioner>
  );
};

export default EmailSignUp;

const Title = styled.div`
  font-size: 4vh;
  margin: 3rem 0;
  text-align: center;

  font-weight: 700;
`;

const Img = styled.div`
  text-align: center;
`;

const Content = styled.div`
  text-align: center;
  margin: 4vh 0;
  font-weight: bold;
`;

const Color = styled.span`
  color: #4b10f2;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  @media all and (min-width: 1024px) {
    width: 500px;
  }
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 400px;
  }
  @media all and (max-width: 767px) {
    width: 300px;
  }
`;
