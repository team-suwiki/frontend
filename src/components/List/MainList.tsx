import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { main } from 'api/Lecture';
import { LectureContainer } from 'components';
import { fakeLectureList } from 'constants/placeholderData';
import useRouter from 'hooks/useRouter';

const MainList = () => {
  const { query } = useRouter();
  const option = query.option || 'modifiedDate';
  const major = query.majorType || '전체';

  const mainLectures = useQuery({
    queryKey: ['main', option, major],
    queryFn: () => main(option, 1, major),
    placeholderData: keepPreviousData,
  });

  return (
    <LectureContainer
      data={mainLectures !== undefined ? mainLectures?.data?.data : fakeLectureList}
    />
  );
};

export default MainList;
