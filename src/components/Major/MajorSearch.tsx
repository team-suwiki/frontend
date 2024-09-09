import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import useFavoriteMajor from 'hooks/useFavoriteMajor';
import { Fragment, useState } from 'react';

const MajorSearch = ({
  setModalIsOpen,
}: {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [searchMajor, setSearchMajor] = useState('');
  const [all, setAll] = useState(true);
  const { db, favoriteDb, majorChange, majorType, onFavoriteMajor, clickSubmit } =
    useFavoriteMajor(setModalIsOpen);

  return (
    <ModalWrapper>
      <TitleWrapper>
        <Title>개설학과 검색</Title>
        <Title onClick={() => setModalIsOpen(false)}>X</Title>
      </TitleWrapper>
      <TitleLine />
      <InputWrapper>
        <TextField
          fullWidth
          variant="standard"
          placeholder="개설학과를 검색하세요."
          value={searchMajor}
          onChange={(e) => setSearchMajor(e.target.value)}
        />
      </InputWrapper>
      <TabWrapper>
        <TabMenu id={all ? 'selected' : undefined} onClick={() => setAll(true)}>
          전체
        </TabMenu>
        <TabMenu id={all ? undefined : 'selected'} onClick={() => setAll(false)}>
          즐겨찾기
        </TabMenu>
      </TabWrapper>
      <MajorBox onChange={majorChange}>
        {(all ? db : favoriteDb)
          .filter((v) => (searchMajor === '' ? v : v.includes(searchMajor) ? v : null))
          .map((v) => (
            <Fragment key={v}>
              <FormCheckLeft
                type="radio"
                id={v}
                value={v}
                name="majorType"
                defaultChecked={majorType === v}
              />
              <MajorSelect htmlFor={v}>
                <SearchIcon
                  loading="lazy"
                  src={
                    !favoriteDb.includes(v)
                      ? 'images/icon-emptystar-24.svg'
                      : 'images/icon_fullstar_24.svg'
                  }
                  width={20}
                  alt={v}
                  onClick={onFavoriteMajor}
                />
                {v}
              </MajorSelect>
            </Fragment>
          ))}
      </MajorBox>
      <SubmitButton onClick={clickSubmit}>확인</SubmitButton>
    </ModalWrapper>
  );
};

export default MajorSearch;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 95%;
`;

const Title = styled.div`
  font-size: 20px;

  cursor: pointer;
`;

const TitleLine = styled.div`
  margin-top: 18px;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
`;

const InputWrapper = styled.div`
  width: 95%;
  margin-top: 40px;
`;

const TabWrapper = styled.div`
  display: flex;
  margin-top: 36px;
  width: 95%;
`;

const TabMenu = styled.div`
  font-size: 16px;
  color: #a3a3a3;

  font-weight: 400;
  margin-right: 15px;
  &#selected {
    color: black;
  }
  &:hover {
    cursor: pointer;
  }
`;

const MajorBox = styled.div`
  width: 95%;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  height: 500px;
  overflow-y: scroll;
  padding: 5px;
`;

const MajorSelect = styled.label`
  display: flex;
  align-items: center;

  font-size: 16px;
  width: 100%;
  padding: 5px;
  &:hover {
    background-color: #eeeeee;
  }
`;

const SubmitButton = styled.div`
  background-color: #336af8;
  width: 65%;
  color: #fff;
  text-align: center;
  padding: 14px;
  border-radius: 15px;
  margin-top: 30px;
  font-size: 16px;
  &:hover {
    cursor: pointer;
  }
  @media only screen and (max-width: 550px) {
    width: 95%;
  }
`;

const SearchIcon = styled.img`
  margin-right: 8px;
  color: #e0e0e0;
  &:hover {
    cursor: pointer;
  }
`;

const FormCheckLeft = styled.input`
  display: none;
`;
