import { LectureContainer } from 'components';
import { fakeLectureList } from 'constants/placeholderData';
import useLectureQuery from 'hooks/useLectureQuery';

const MainList = () => {
  const { getMainLecture } = useLectureQuery();

  return (
    <LectureContainer
      data={getMainLecture !== undefined ? getMainLecture?.data?.data : fakeLectureList}
    />
  );
};

export default MainList;
