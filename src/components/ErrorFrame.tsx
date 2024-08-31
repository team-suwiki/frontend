import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { AuthWrapper, Button, Container, Img } from 'styles/common';

interface ErrorFrameProps {
  status?: string;
  mainMsg: string;
  subMsg: string;
}

const ErrorFrame = ({ mainMsg, subMsg }: ErrorFrameProps) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Img src="images/signup.svg" width={400} />
      <AuthWrapper>
        <StyledText id="top">{mainMsg}</StyledText>
        <StyledText>{subMsg}</StyledText>
        <Button background="#336af8" onClick={() => navigate('/')}>
          홈으로 돌아가기
        </Button>
      </AuthWrapper>
    </Container>
  );
};

export default ErrorFrame;

const StyledText = styled.div`
  text-align: center;
  padding-bottom: 2rem;

  font-weight: 600;

  &#top {
    padding-top: 2rem;
  }
`;
