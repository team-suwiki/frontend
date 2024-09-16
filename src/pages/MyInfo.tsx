import { useQuery } from '@tanstack/react-query';
import { User } from 'api';
import { UserInfo } from 'components';
import { CACHE_TIME } from 'constants/cacheTime';
import { fakeUserInfo } from 'constants/placeholderData';
import { isLoginStorage } from 'utils/loginStorage';

const MyInfo = () => {
  const user = User();

  const { data, isLoading } = useQuery({
    queryKey: ['myInfo'],
    queryFn: user.info,
    enabled: isLoginStorage(),
    gcTime: CACHE_TIME.MINUTE_30,
    staleTime: CACHE_TIME.MINUTE_30,
  });

  if (isLoading || !data) return <UserInfo my={fakeUserInfo} />;

  return <UserInfo my={data} />;
};

export default MyInfo;
