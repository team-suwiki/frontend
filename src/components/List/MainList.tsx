import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Lecture } from 'api';
import { LectureContainer } from 'components';
import { fakeLectureList } from 'constants/placeholderData';
import useRouter from 'hooks/useRouter';

const MainList = () => {
  const lecture = Lecture();
  const { query } = useRouter();
  const option = query.option || 'modifiedDate';
  const major = query.majorType || '전체';

  const getMainLecture = useQuery({
    queryKey: ['main', option, major],
    queryFn: () => lecture.main(option, 1, major),
    placeholderData: keepPreviousData,
  });

  return (
    <LectureContainer
      data={getMainLecture !== undefined ? getMainLecture?.data?.data : fakeLectureList}
    />
  );
};

export default MainList;
