import { LectureInfoBox } from 'components';
import { fakeLectureInfo } from 'constants/placeholderData';
import useLectureQuery from 'hooks/useLectureQuery';

const LectureDetail = () => {
  const { Detail } = useLectureQuery();
  const { data, isLogin } = Detail();

  return <LectureInfoBox isLogin={isLogin} current={data?.data ? data.data : fakeLectureInfo} />;
};

export default LectureDetail;
