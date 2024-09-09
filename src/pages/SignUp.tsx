import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { Auth } from 'api';
import { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { AuthWrapper, Button, Checking, Container, Img } from 'styles/common';
import type { UserJoin } from 'types/user';
import {
  validateEmail,
  validateId,
  validatePassword,
  validatePasswordConfirm,
} from 'utils/validate';

type CheckList = 'terms' | 'privacy';

const SignUp = () => {
  const { checkId, checkEmail, register: signup } = Auth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<UserJoin>({ mode: 'onChange' });
  const formValues = watch();

  // 아이디, 이메일 중복확인, 체크리스트 상태
  const [idCheck, setIdCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [checkList, setCheckList] = useState<CheckList[]>([]);

  // 체크박스 전체선택시 모두선택 체크박스 활성화시키기
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetName = e.target.name as CheckList;
    setCheckList((prevCheckList) =>
      e.target.checked
        ? [...prevCheckList, targetName]
        : prevCheckList.filter((item) => item !== targetName),
    );
  };

  // 전체체크 선택시 전체 선택 or 전체해제
  const checkAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setCheckList(isChecked ? ['terms', 'privacy'] : []);
  };

  const handleIdCheck = () => checkId(setIdCheck, { loginId: formValues.loginId });
  const handleEmailCheck = () => checkEmail(setEmailCheck, { email: formValues.email });
  const onSubmit: SubmitHandler<UserJoin> = ({ loginId, email, password }) =>
    signup({ loginId, email, password });

  // 중복확인 이후 값 변경 시 상태 초기화
  useEffect(() => {
    setIdCheck((prev) => prev && false);
  }, [formValues.loginId]);
  useEffect(() => {
    setEmailCheck((prev) => prev && false);
  }, [formValues.email]);

  return (
    <Container>
      <picture>
        <source srcSet="/images/signup.avif" type="image/avif" />
        <source srcSet="/images/signup.webp" type="image/webp" />
        <source srcSet="/images/signup.png" type="image/png" />
        <Img src="images/signup.svg" alt="signup" width={400} height={350} />
      </picture>
      <AuthWrapper onSubmit={handleSubmit(onSubmit)}>
        <Title>회원가입</Title>
        <InputWrapper id="top">
          <TextField
            variant="standard"
            margin="normal"
            label="아이디"
            fullWidth
            {...register('loginId', validateId)}
          />
          <Button
            id="check"
            type="button"
            disabled={!!errors.loginId || !formValues.loginId || idCheck}
            onClick={handleIdCheck}
            background="#336af8"
          >
            {idCheck ? '확인완료' : '중복확인'}
          </Button>
        </InputWrapper>
        {errors.loginId && <Checking>{errors.loginId.message}</Checking>}

        <TextField
          variant="standard"
          type="password"
          margin="normal"
          label="비밀번호"
          {...register('password', validatePassword)}
        />
        {errors.password && <Checking>{errors.password.message}</Checking>}
        <TextField
          variant="standard"
          type="password"
          margin="normal"
          label="비밀번호 확인"
          {...register('passwordConfirm', validatePasswordConfirm(formValues.password))}
        />
        {errors.passwordConfirm && <Checking>{errors.passwordConfirm.message}</Checking>}
        <InputWrapper id="top">
          <TextField
            variant="standard"
            type="email"
            margin="normal"
            label="학교 이메일(@suwon.ac.kr)"
            fullWidth
            {...register('email', validateEmail)}
          />
          <Button
            disabled={!!errors.email || !formValues.email || emailCheck}
            id="check"
            type="button"
            onClick={handleEmailCheck}
            background="#336af8"
          >
            {emailCheck ? '확인완료' : '중복확인'}
          </Button>
        </InputWrapper>
        {errors.email && <Checking>{errors.email.message}</Checking>}

        <EmailWrapper>
          * 수원대 이메일 인증 후 서비스 이용이 가능합니다.
          <br />
          <br />* 이메일 인증 시 주의 사항
          <br />- 웹메일이 휴면 상태인지 확인해주세요.
          <br />- 웹메일 계정은 포털 계정과 다르니 이 부분 주의 바랍니다.
        </EmailWrapper>

        <Label>
          <InputWrapper>
            <input
              type="checkbox"
              name="checkAll"
              onChange={checkAll}
              checked={checkList.length === 2}
            />
            아래 내용에 모두 동의합니다.
          </InputWrapper>
        </Label>
        <Label>
          <InputWrapper>
            <input
              type="checkbox"
              name="terms"
              onChange={handleCheck}
              checked={checkList.includes('terms')}
            />
            이용약관 동의(필수)
          </InputWrapper>
          <AgreeButton
            className="showMore"
            onClick={() => window.open('https://sites.google.com/view/suwiki-policy-terms')}
          >
            상세보기
          </AgreeButton>
        </Label>
        <Label id="last">
          <InputWrapper>
            <input
              type="checkbox"
              name="privacy"
              onChange={handleCheck}
              checked={checkList.includes('privacy')}
            />
            개인정보처리방침 동의(필수)
          </InputWrapper>
          <AgreeButton
            className="showMore"
            onClick={() => window.open('https://sites.google.com/view/suwiki-policy-privacy')}
          >
            상세보기
          </AgreeButton>
        </Label>
        <Button
          disabled={!isValid || !idCheck || !emailCheck || checkList.length !== 2}
          background="#336af8"
        >
          회원가입
        </Button>
      </AuthWrapper>
    </Container>
  );
};

export default SignUp;

const Title = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.5rem;

  font-weight: 600;
  padding-top: 1rem;
  padding-bottom: 1rem;
  @media only screen and (max-width: 960px) {
    font-weight: 600;
  }
`;

const Label = styled.label`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  font-size: 0.8rem;
  input {
    margin: 0 10px 0 0;
  }
  &#last {
    padding-top: 8px;
    padding-bottom: 3vh;
  }
`;

const EmailWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;

  font-weight: 600;
`;

const AgreeButton = styled.button`
  border: 0;
  background: 0 0;
  cursor: pointer;
  text-decoration: underline;
  color: gray;
  line-height: 1.5;
  display: block;
  float: right;
  font-size: 12px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  &#top {
    align-items: stretch;
  }
`;
