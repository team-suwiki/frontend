import { User } from 'api';
import { UserInfo } from 'components';
import { CACHE_TIME } from 'constants/cacheTime';
import { fakeUserInfo } from 'constants/placeholderData';
import { useQuery } from 'react-query';
import { isLoginStorage } from 'utils/loginStorage';

const MyInfo = () => {
  const user = User();

  const { data, isLoading } = useQuery(['myInfo'], user.info, {
    enabled: isLoginStorage(),
    cacheTime: CACHE_TIME.MINUTE_30,
    staleTime: CACHE_TIME.MINUTE_30,
  });

  if (isLoading || !data) return <UserInfo my={fakeUserInfo} />;

  return <UserInfo my={data} />;
};

export default MyInfo;
