import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { evaluation, examInfo } from 'api/Lecture';
import {
  Button,
  IsTestInfo,
  LectureDetail,
  LectureSearch,
  Modal,
  SearchEvaluationList,
  WriteEvaluation,
  WriteTestInfo,
} from 'components';
import { CACHE_TIME } from 'constants/cacheTime';
import useRouter from 'hooks/useRouter';
import useUserStore from 'hooks/useUserStore';
import { useState } from 'react';
import { AppContainer } from 'styles/common';
import type { Review } from 'types/evaluate';

const CATEGORY = ['강의평가', '시험정보'] as const;
export type Category = (typeof CATEGORY)[number];

//TODO: 2년 전 내 의도 파악 후.. 제거
const lectureInfo: Review = {
  id: -1,
  lectureName: '',
  professor: '',
  semesterList: '',
  selectedSemester: '',
  examInfo: '',
  examType: '',
  examDifficulty: '',
  content: '',
  satisfaction: -1,
  learning: -1,
  honey: -1,
  team: -1,
  difficulty: -1,
  homework: -1,
  majorType: '',
  totalAvg: -1,
};

const LectureInfo = () => {
  const { query, setParams } = useRouter();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const selectCategory = (query.category as Category) || '강의평가';
  const { isLogin } = useUserStore();

  const selectId = query.id || '';

  const evaluations = useInfiniteQuery({
    queryKey: ['lecture', 'evaluationList', selectId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => evaluation(selectId, pageParam),
    getNextPageParam: (lastPage) => (lastPage && !lastPage.isLast ? lastPage.nextPage : undefined),
    gcTime: CACHE_TIME.MINUTE_0,
    staleTime: CACHE_TIME.MINUTE_0,
    enabled: isLogin && selectId !== '' && selectCategory === '강의평가',
  });

  const testInfos = useInfiniteQuery({
    queryKey: ['lecture', 'examList', selectId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => examInfo(selectId, pageParam),
    getNextPageParam: (lastPage) => (lastPage && !lastPage.isLast ? lastPage.nextPage : undefined),
    gcTime: CACHE_TIME.MINUTE_0,
    staleTime: CACHE_TIME.MINUTE_0,
    enabled: isLogin && selectId !== '' && selectCategory === '시험정보',
  });

  const handleCategory = (newCategory: Category) => {
    setParams((prev) => {
      const updatedParams = new URLSearchParams(prev);
      updatedParams.set('category', newCategory);

      return updatedParams;
    });
  };
  const isWritten = !!evaluations.data?.pages[0]?.written || !!testInfos.data?.pages[0]?.written;

  return (
    <AppContainer>
      <LectureSearch />

      <Wrapper>
        {/* 강의 정보 세부 */}
        <LectureDetail />
        {/* 강의 평가 / 시험 정보 리스트 */}
        <Content>
          <TitleWrapper>
            <List>
              {CATEGORY.map((category) => (
                <MenuTitle
                  key={category}
                  isSelected={category === selectCategory}
                  onClick={() => handleCategory(category)}
                >
                  {category}
                </MenuTitle>
              ))}
            </List>
            <Button
              width="78px"
              onClick={() =>
                !isLogin
                  ? alert('로그인해 주세요')
                  : !isWritten
                    ? setModalIsOpen(true)
                    : alert(`이미 작성한 ${selectCategory}가 있습니다`)
              }
            >
              쓰기
            </Button>
          </TitleWrapper>
          {selectCategory === '강의평가' ? <SearchEvaluationList /> : <IsTestInfo />}
        </Content>
      </Wrapper>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        {selectCategory === '강의평가' ? (
          <WriteEvaluation row={lectureInfo} type="write" setModalIsOpen={setModalIsOpen} />
        ) : (
          <WriteTestInfo row={lectureInfo} type="write" setModalIsOpen={setModalIsOpen} />
        )}
      </Modal>
    </AppContainer>
  );
};

export default LectureInfo;

const Content = styled.div`
  border-radius: 10px;
  margin: 10px 0;
  margin-bottom: 3rem;

  &#top {
    padding: 1rem 2rem;
    border: 1px solid rgb(224, 224, 224);
  }

  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  align-items: flex-end;

  justify-content: space-between;
  align-items: center;
`;

const List = styled.ul`
  display: flex;
`;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const MenuTitle = styled.li<{ isSelected: boolean }>`
  font-size: 16px;
  text-align: center;

  display: flex;
  color: ${({ isSelected }) => (isSelected ? 'black' : 'lightgray')};
  padding-right: 1rem;

  &:hover {
    cursor: pointer;
  }
`;
