import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import useSearch from 'hooks/useSearch';
import { useEffect, useState } from 'react';

const SEARCH_TEXT = ['교수명', '강의명', '학과명', '키워드'];

const LectureSearch = () => {
  const [input, onKeypress] = useSearch();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % SEARCH_TEXT.length);
    }, 2_000);

    return () => {
      clearInterval(rotationInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SearchWrapper>
      <SearchTitle>
        <TitleFirstLine>
          <SlotMachineContainer>
            <AnimatePresence initial={false}>
              <SlotMachineItem
                key={currentTextIndex}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {SEARCH_TEXT[currentTextIndex]}
              </SlotMachineItem>
            </AnimatePresence>
          </SlotMachineContainer>
          으로
        </TitleFirstLine>
        <TitleSecondLine>강의평가를 찾아보세요!</TitleSecondLine>
      </SearchTitle>
      <SearchInput ref={input} placeholder="검색어를 입력해주세요" onKeyDown={onKeypress} />
    </SearchWrapper>
  );
};

export default LectureSearch;

const SearchWrapper = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
`;

const SearchTitle = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  padding-top: 4rem;
  padding-bottom: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
  width: 100%;
`;

const TitleFirstLine = styled.div`
  display: flex;
`;

const TitleSecondLine = styled.div`
  display: block;
  width: 100%;
`;

const SlotMachineContainer = styled.span`
  height: 1.8rem;
  overflow: hidden;
  position: relative;
  display: inline-block;
  min-width: 4rem;
`;

const SlotMachineItem = styled(motion.div)`
  position: absolute;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  border-bottom: 1.5px solid #000000;
  background-image: url('images/icon_search_24.svg');
  background-repeat: no-repeat;
  background-position: 99%;

  font-weight: 400;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 550px) {
    font-size: 16px;
    width: 123%;
    transform: scale(0.8);
  }
`;
