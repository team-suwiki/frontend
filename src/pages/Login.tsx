import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { Auth } from 'api';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthWrapper, Container, Img } from 'styles/common';

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const { login } = Auth();

  const loginAttempt: SubmitHandler<FieldValues> = async (data) => {
    const loginId = data.loginId as string;
    const password = data.password as string;
    await login({ loginId, password });
  };

  const goIdSearch = () => navigate('/idsearch');
  const goPwSearch = () => navigate('/pwsearch');

  return (
    <Container>
      <picture>
        <source srcSet="/images/signup.avif" type="image/avif" />
        <source srcSet="/images/signup.webp" type="image/webp" />
        <source srcSet="/images/signup.png" type="image/png" />
        <Img src="images/signup.svg" alt="signup" width={400} height={350} />
      </picture>
      <AuthWrapper onSubmit={handleSubmit(loginAttempt)}>
        <Title>로그인</Title>
        <TextField
          variant="standard"
          margin="normal"
          required
          label="아이디"
          {...register('loginId')}
        />
        <TextField
          variant="standard"
          margin="normal"
          required
          label="비밀번호"
          type="password"
          {...register('password')}
        />
        <SearchWrapper>
          <div>
            <SearchButton type="button" onClick={goIdSearch}>
              아이디 찾기
            </SearchButton>
            <SearchButton type="button" onClick={goPwSearch}>
              비밀번호 찾기
            </SearchButton>
          </div>
        </SearchWrapper>
        <Button type="submit" disabled={isSubmitting}>
          로그인
        </Button>
      </AuthWrapper>
    </Container>
  );
};

export default Login;

const Title = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.5rem;

  font-weight: 600;
  padding-top: 1rem;
  padding-bottom: 1rem;

  @media only screen and (max-width: 550px) {
    font-size: 24px;
    font-weight: 600;
  }
`;

const Button = styled.button`
  padding: 1rem;
  margin: 8px 0;
  border: none;
  background: #336af8;
  color: white;
  font-size: 1.1rem;
  border-radius: 12px;

  font-weight: 600;
  cursor: pointer;
  transition: 0.3s all;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media only screen and (max-width: 550px) {
    margin-top: 5rem;
  }
`;

const SearchButton = styled.button`
  border: none;
  border-bottom: 1px solid;
  padding: 0;
  margin-left: 10px;

  font-weight: 300;
  background-color: white;
  &:hover {
    cursor: pointer;
  }
`;

const SearchWrapper = styled.div`
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
