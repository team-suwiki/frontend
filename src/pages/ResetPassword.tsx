import { TextField } from '@mui/material';
import { Auth } from 'api';
import { Button } from 'components';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { AuthWrapper, Checking, Container, Img, Sub, Title } from 'styles/common';
import type { ResetPassword as ResetPasswordType } from 'types/user';
import { validatePassword } from 'utils/validate';

const ResetPassword = () => {
  const { resetPassword } = Auth();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ResetPasswordType>({ mode: 'onChange' });

  const onResetPwSubmit: SubmitHandler<ResetPasswordType> = (data) => resetPassword(data);

  return (
    <Container>
      <Img src="images/signup.svg" width={400} />
      <AuthWrapper onSubmit={handleSubmit(onResetPwSubmit)}>
        <Title>비밀번호 변경</Title>
        <Sub>기존 비밀번호를 입력하세요</Sub>
        <TextField
          variant="standard"
          type="password"
          margin="normal"
          placeholder="기존 비밀번호 입력"
          {...register('prePassword', { required: true })}
        />

        <Sub>새로운 비밀번호를 입력하세요</Sub>

        <TextField
          variant="standard"
          type="password"
          margin="normal"
          placeholder="새 비밀번호 입력"
          {...register('newPassword', validatePassword)}
        />
        {errors.newPassword && <Checking>{errors.newPassword.message}</Checking>}

        <Button id="auth" type="submit" disabled={!isValid}>
          전송
        </Button>
      </AuthWrapper>
    </Container>
  );
};

export default ResetPassword;
