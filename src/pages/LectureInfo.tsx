import styled from '@emotion/styled';
import { lectureState } from 'app/recoilStore';
import {
  IsTestInfo,
  LectureDetail,
  LectureSearch,
  Modal,
  SearchEvaluationList,
  WriteEvaluation,
  WriteTestInfo,
} from 'components';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { AppContainer } from 'styles/common';
import { isLoginStorage } from 'utils/loginStorage';

const menu = [
  { name: '강의평가', option: '강의평가' },
  { name: '시험정보', option: '시험정보' },
];

type CheckListNumber = 0 | 1;

const LectureInfo = () => {
  const [check, setCheck] = useState('강의평가');
  const [written, setWritten] = useState(false);
  const [menuCheck, setMenuCheck] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const lectureInfo = useRecoilValue(lectureState);
  const [searchparams] = useSearchParams();
  const selectId = searchparams.get('id') || '';
  const isLogin = isLoginStorage();

  const checkList = {
    0: <SearchEvaluationList isLogin={isLogin} selectId={selectId} setWritten={setWritten} />,
    1: <IsTestInfo selectId={selectId} setWritten={setWritten} />,
  };
  const menuList = menu.map((i, index) => (
    <MenuTitle key={i.option} id={i.option} onClick={(e) => clickFunc(e, index)}>
      {i.name}
    </MenuTitle>
  ));

  const clickFunc = (e: any, index: number) => {
    setMenuCheck(index);
    setCheck(e.target.id);
  };

  return (
    <AppContainer>
      <LectureSearch />

      <Wrapper>
        {/* 강의 정보 세부 */}
        <LectureDetail />
        {/* 강의 평가 / 시험 정보 리스트 */}
        <Content>
          <TitleWrapper id="top">
            <TitleWrapper id="bottom">{menuList}</TitleWrapper>
            <Writing
              width={78}
              height={34}
              src="images/btn_write.svg"
              onClick={() =>
                !isLogin
                  ? alert('로그인해 주세요')
                  : !written
                    ? setModalIsOpen(true)
                    : alert(`이미 작성한 ${check}가 있습니다`)
              }
            />
          </TitleWrapper>
          {checkList[menuCheck as CheckListNumber]}
        </Content>
      </Wrapper>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        {menuCheck === 0 ? (
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

  &#top {
    justify-content: space-between;
    align-items: flex-start;
  }
  &#bottom {
    margin-top: 1rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const MenuTitle = styled.li`
  font-size: 16px;
  margin-bottom: 1rem;
  text-align: center;

  display: flex;
  color: lightgray;
  padding-right: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

const Writing = styled.img`
  &:hover {
    cursor: pointer;
  }
`;
