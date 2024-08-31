import { Auth } from 'api';
import { Button } from 'components';
import { CssTextField } from 'components/Etc/CssTextField';
import { Loader } from 'components/Etc/Spinner';
import { type SubmitHandler,useForm } from 'react-hook-form';
import { AuthWrapper, Container, Img, Sub, Title } from 'styles/common';
import type { UserEmail } from 'types/user';
import { validateEmail } from 'utils/validate';

const IdSearch = () => {
  const { findId } = Auth();
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<UserEmail>();

  const onEmailSubmit: SubmitHandler<UserEmail> = (data) => findId(data);

  return (
    <Container>
      <Img src="images/signup.svg" width={400} />
      <AuthWrapper onSubmit={handleSubmit(onEmailSubmit)}>
        <Title>아이디 찾기</Title>
        <Sub>학교 계정을 입력하세요</Sub>
        <CssTextField
          variant="standard"
          margin="normal"
          label="학교 이메일 입력(@suwon.ac.kr)"
          {...register('email', validateEmail)}
        />
        <Button id="auth" type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? <Loader id="button" /> : '전송'}
        </Button>
      </AuthWrapper>
    </Container>
  );
};

export default IdSearch;
