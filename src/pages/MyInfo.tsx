import { useQuery } from '@tanstack/react-query';
import { info } from 'api/User';
import { UserInfo } from 'components';
import { CACHE_TIME } from 'constants/cacheTime';
import { fakeUserInfo } from 'constants/placeholderData';
import useUserStore from 'hooks/useUserStore';

const MyInfo = () => {
  const { isLogin } = useUserStore();
  const { data, isLoading } = useQuery({
    queryKey: ['myInfo'],
    queryFn: info,
    enabled: isLogin,
    gcTime: CACHE_TIME.MINUTE_30,
    staleTime: CACHE_TIME.MINUTE_30,
  });

  if (isLoading || !data) return <UserInfo my={fakeUserInfo} />;

  return <UserInfo my={data} />;
};

export default MyInfo;
