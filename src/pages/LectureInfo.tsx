import styled from '@emotion/styled';
import { lectureState } from 'app/recoilStore';
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
import useLectureQuery from 'hooks/useLectureQuery';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { AppContainer } from 'styles/common';
import { isLoginStorage } from 'utils/loginStorage';

const CATEGORY = ['강의평가', '시험정보'] as const;
export type Category = (typeof CATEGORY)[number];

const LectureInfo = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const lectureInfo = useRecoilValue(lectureState);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectCategory = (searchParams.get('category') as Category) || '강의평가';
  const isLogin = isLoginStorage();
  const { evaluation, testInfo } = useLectureQuery();

  const handleCategory = (newCategory: Category) => {
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev);
      updatedParams.set('category', newCategory);

      return updatedParams;
    });
  };
  const isWritten = !!evaluation.data?.pages[0]?.written || !!testInfo.data?.pages[0]?.written;

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
