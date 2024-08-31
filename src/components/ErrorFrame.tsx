import styled from '@emotion/styled';
import { AuthWrapper, Container, Img } from 'styles/common';

interface ErrorFrameProps {
  status?: string;
  mainMsg: string;
  subMsg: string;
}

const ErrorFrame = ({ mainMsg, subMsg }: ErrorFrameProps) => {
  return (
    <Container>
      <Img src="images/signup.svg" width={400} />
      <AuthWrapper>
        <StyledText id="top">{mainMsg}</StyledText>
        <StyledText>{subMsg}</StyledText>
        <StyleLink href="/">홈으로 돌아가기</StyleLink>
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

const StyleLink = styled.a`
  text-align: center;
`;
