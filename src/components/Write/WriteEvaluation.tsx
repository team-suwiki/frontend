import styled from '@emotion/styled';
import SemesterSelect from 'components/SemesterSelect';
import {
  EvaluationSelectOptions,
  EvaluationSliderOptions,
  semesters,
} from 'constants/placeholderData';
import useWriteEvaluation from 'hooks/useWriteEvaluation';
import { Fragment } from 'react';
import type { Review } from 'types/evaluate';

export interface WriteEvaluationProps {
  row: Review;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}

type SliderId = 'honey' | 'learning' | 'satisfaction';
type LectureId = 'team' | 'homework' | 'difficulty';

const WriteEvaluation = ({ setModalIsOpen, row, type }: WriteEvaluationProps) => {
  const {
    selectedSemester,
    SliderOptions,
    lectureOptions,
    content,
    setSelectedSemester,
    onChangeContent,
    onChangeLectureOptions,
    onEvaluate,
  } = useWriteEvaluation({ setModalIsOpen, row, type });

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{row.lectureName}</Title>
        <TitleButton
          onClick={() => {
            setModalIsOpen(false);
          }}
        >
          X
        </TitleButton>
      </TitleWrapper>

      <ContentWrapper>
        <Content id="group">
          <ContentTitle>수강학기</ContentTitle>
          <SemesterSelect
            list={semesters(row.semesterList!)}
            selected={selectedSemester}
            setSelect={setSelectedSemester}
          />
        </Content>
        <MobileContent id="semester">
          <ContentTitle id="mobile">수강학기</ContentTitle>
          <SemesterSelect
            list={semesters(row.semesterList!)}
            selected={selectedSemester}
            setSelect={setSelectedSemester}
          />
        </MobileContent>
        {EvaluationSliderOptions.map(({ id, name }) => {
          const { state, Slider } = SliderOptions[id as SliderId];

          return (
            <Fragment key={id}>
              <Content>
                <ContentTitle>{name}</ContentTitle>
                <Slider />
                <Score>{state}</Score>
              </Content>
              <MobileContent>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ContentTitle id="mobile">{name}</ContentTitle>
                  <Score id="mobile">{state}</Score>
                </div>
                <Slider />
              </MobileContent>
            </Fragment>
          );
        })}
        {EvaluationSelectOptions.map(({ id, title, options }) => (
          <Content key={id} id="content">
            <ContentTitle>{title}</ContentTitle>
            {options.map(({ id: level, name, value }) => {
              console.log(name, lectureOptions, level, value);

              return (
                <label key={level}>
                  <FormCheckLeft
                    type="radio"
                    name={id}
                    id={level}
                    value={value}
                    checked={lectureOptions[id as LectureId] === value}
                    onChange={onChangeLectureOptions}
                  />
                  <FormCheckText checked={lectureOptions[id as LectureId] === value}>
                    {name}
                  </FormCheckText>
                </label>
              );
            })}
          </Content>
        ))}
      </ContentWrapper>
      <TextField
        placeholder="강의평가를 작성해주세요 :)"
        defaultValue={content}
        onChange={onChangeContent}
        rows={15}
      />
      <Wrapper id="button">
        <EditButton onClick={onEvaluate}>
          {type === 'write' ? '작성하기 (+10P)' : '수정하기'}
        </EditButton>
      </Wrapper>
    </Wrapper>
  );
};

export default WriteEvaluation;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  &#button {
    align-items: center;
  }
`;

const Title = styled.div`
  font-size: 18px;
  padding: 2rem;
  padding-bottom: 1rem;
  @media only screen and (max-width: 550px) {
    padding: 1rem;
  }
`;

const TitleButton = styled.button`
  font-size: 18px;
  padding: 2rem;
  padding-bottom: 1rem;
  border: none;
  border-radius: 15px;
  background-color: white;
  cursor: pointer;
  @media only screen and (max-width: 550px) {
    padding: 1rem;
  }
`;

const Score = styled.span`
  margin: 2px 0 1px 24px;
  font-size: 18px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.11;
  letter-spacing: 0.32px;
  color: #336af8;
  &#mobile {
    margin-right: 30px;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  margin: 1.5rem 0;
  border-bottom: 1px solid #e0e0e0;
  @media only screen and (max-width: 550px) {
    padding-left: 1rem;
    margin-bottom: 0.7rem;
  }
`;

const Content = styled.form`
  display: flex;
  margin: 0.5rem 0;
  align-items: center;
  &#group {
    margin-bottom: 1.5rem;
  }
  @media only screen and (max-width: 550px) {
    display: none;
    &#content {
      display: flex;
      margin: 0.5rem 0;
      align-items: center;
    }
  }
`;

const MobileContent = styled.form`
  display: none;
  @media only screen and (max-width: 550px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    &#semester {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
`;

const ContentTitle = styled.div`
  width: 20%;
  &#mobile {
    width: 30%;
  }
`;

const TextField = styled.textarea`
  margin-bottom: 20px;
  width: 100%;
  resize: none;
  padding: 22px;
  outline-color: #336af8;
  border: solid 1px #e0e0e0;
  border-radius: 15px;
  background-color: #f9f9f9;
  @media only screen and (max-width: 550px) {
    min-height: 50px;
    font-size: 16px;
    transform: scale(0.9);
  }
`;

const EditButton = styled.button`
  font-size: 16px;

  font-weight: 600;
  width: 350px;
  padding: 12px 20px;
  text-align: center;
  color: #ffffff;
  background-color: #336af8;
  border-radius: 15px;
  border: none;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: auto;
    color: none;
    background-color: #efefef;
  }
  @media only screen and (max-width: 550px) {
    width: 80%;
    margin-bottom: 20px;
  }
`;

const FormCheckText = styled.span<{ checked: boolean }>`
  font-size: 1vw;
  padding: 8px 15px;
  background-color: #eee;
  border-radius: 10px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${(state) => (state.checked ? '#336af8' : '#777')};
  margin-right: 8px;

  @media only screen and (max-width: 550px) {
    font-size: 12px;
    padding: 6px 9px;
  }
`;

const FormCheckLeft = styled.input`
  display: none;
`;
