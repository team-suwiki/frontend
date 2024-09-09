import { TextField } from '@mui/material';
import { Auth } from 'api';
import { Button } from 'components';
import { Loader } from 'components/Etc/Spinner';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { AuthWrapper, Container, Img, Sub, Title } from 'styles/common';
import type { UserFindPw } from 'types/user';
import { validateEmail } from 'utils/validate';

const PwSearch = () => {
  const { findPw } = Auth();
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<UserFindPw>();

  const onSubmit: SubmitHandler<UserFindPw> = (data) => findPw(data);

  return (
    <Container>
      <Img src="images/signup.svg" width={400} />
      <AuthWrapper onSubmit={handleSubmit(onSubmit)}>
        <Title>비밀번호 찾기</Title>
        <Sub>아이디에 해당하는 학교 이메일로 임시 비밀번호를 전송합니다</Sub>
        <TextField
          variant="standard"
          margin="normal"
          label="아이디"
          {...register('loginId', { required: true })}
        />
        <TextField
          variant="standard"
          margin="normal"
          label="학교 이메일"
          {...register('email', validateEmail)}
        />
        <Button id="auth" type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? <Loader id="button" /> : '전송'}
        </Button>
      </AuthWrapper>
    </Container>
  );
};

export default PwSearch;
