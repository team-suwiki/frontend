import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { banList, resList } from 'api/User';
import { BanFrame } from 'components';
import { AppContainer } from 'styles/common';

const BanReason = () => {
  const { data: ban } = useQuery({
    queryKey: ['myInfo', 'ban'],
    queryFn: banList,
  });
  const { data: restrict } = useQuery({ queryKey: ['myInfo', 'restrict'], queryFn: resList });

  return (
    <AppContainer>
      <AppTitle>블랙리스트 내역조회</AppTitle>
      <BanFrame banType="ban" list={ban} />

      <AppTitle>이용제한 내역조회</AppTitle>
      <BanFrame banType="res" list={restrict} />
    </AppContainer>
  );
};

export default BanReason;

const AppTitle = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.5rem;

  font-weight: 600;
  padding-top: 5rem;
  padding-bottom: 1rem;
`;
