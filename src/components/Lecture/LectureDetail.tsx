import { useQuery } from '@tanstack/react-query';
import { Lecture } from 'api';
import { CACHE_TIME } from 'constants/cacheTime';
import { fakeLectureInfo } from 'constants/placeholderData';
import useRouter from 'hooks/useRouter';
import { isLoginStorage } from 'utils/loginStorage';

import LectureInfoBox from './LectureInfoBox';

const LectureDetail = () => {
  const { query } = useRouter();
  const isLogin = isLoginStorage();
  const lecture = Lecture();
  const selectId = query.id || '';

  const detail = useQuery({
    queryKey: ['lecture', 'detail', selectId],
    queryFn: () => lecture.detail(selectId),
    gcTime: CACHE_TIME.MINUTE_0,
    staleTime: CACHE_TIME.MINUTE_0,
    enabled: isLogin && selectId !== '',
  });

  return <LectureInfoBox current={detail.data?.data || fakeLectureInfo} />;
};

export default LectureDetail;
