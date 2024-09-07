import { LectureInfoBox } from 'components';
import { fakeLectureInfo } from 'constants/placeholderData';
import useLectureQuery from 'hooks/useLectureQuery';

const LectureDetail = () => {
  const { detail } = useLectureQuery();
  const { data } = detail;

  return <LectureInfoBox current={data?.data ? data.data : fakeLectureInfo} />;
};

export default LectureDetail;
