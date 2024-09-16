import { useQuery } from '@tanstack/react-query';
import { detail } from 'api/Lecture';
import { CACHE_TIME } from 'constants/cacheTime';
import { fakeLectureInfo } from 'constants/placeholderData';
import useRouter from 'hooks/useRouter';
import useUserStore from 'hooks/useUserStore';

import LectureInfoBox from './LectureInfoBox';

const LectureDetail = () => {
  const { query } = useRouter();
  const { isLogin } = useUserStore();
  const selectId = query.id || '';

  const { data } = useQuery({
    queryKey: ['lecture', 'detail', selectId],
    queryFn: () => detail(selectId),
    gcTime: CACHE_TIME.MINUTE_0,
    staleTime: CACHE_TIME.MINUTE_0,
    enabled: isLogin && selectId !== '',
  });

  return <LectureInfoBox current={data?.data || fakeLectureInfo} />;
};

export default LectureDetail;
