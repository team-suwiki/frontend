import styled from '@emotion/styled';
import { User } from 'api';
import SemesterSelect from 'components/SemesterSelect';
import { ExamSelectOptions, examTypes, semesters } from 'constants/placeholderData';
import { useState } from 'react';
import { useMutation } from 'react-query';
import type { MyExam } from 'types/exam';

type WriteTestProps = 'examDifficulty' | 'examInfo';

interface WriteTestInfoProps {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  row: MyExam;
  type: string;
}

const WriteTestInfo = ({ setModalIsOpen, row, type }: WriteTestInfoProps) => {
  const user = User();
  const [selectedSemester, setSelectedSemester] = useState(row.selectedSemester); //학기
  const [examType, setExamType] = useState(row.examType); //중간,기말
  const [content, setContent] = useState(row.content); //글쓰기
  const [examOptions, setExamOptions] = useState({
    examInfo: row.examInfo.split(', '),
    examDifficulty: row.examDifficulty,
  }); //시험내용 옵션
  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const { name, value, checked } = e.currentTarget;
    const { examInfo } = examOptions;
    const change = {
      examDifficulty: () => setExamOptions({ ...examOptions, examDifficulty: value }),
      examInfo: () => {
        if (checked) {
          setExamOptions({ ...examOptions, examInfo: [...examInfo, value] });
        } else {
          setExamOptions({
            ...examOptions,
            examInfo: examInfo.filter((data) => data !== value),
          });
        }
      },
    };
    change[name as WriteTestProps]();
  };
  const examWriting = useMutation(() =>
    user.writeExamInfo(row.id.toString(), {
      lectureName: row.lectureName,
      professor: row.professor,
      selectedSemester,
      examInfo: examOptions.examInfo.join(', '),
      examType,
      examDifficulty: examOptions.examDifficulty,
      content,
    }),
  );

  const examInfoUpdate = useMutation(() =>
    user.UpdateExamInfo(row.id.toString(), {
      selectedSemester,
      examInfo: examOptions.examInfo.join(', '),
      examType,
      examDifficulty: examOptions.examDifficulty,
      content,
    }),
  );

  const onTest = () => {
    if (selectedSemester === '' || selectedSemester === '선택') return alert('학기를 선택해주세요');
    if (examType === '' || examType === '선택') return alert('시험종류를 선택해주세요');
    if (examOptions.examDifficulty === '') return alert('난이도(란)을 선택해주세요');
    if (examOptions.examInfo.length === 0) return alert('시험유형(란)을 선택해주세요');
    if (content.length < 30 || content.length > 1000)
      return alert('최소 30자 이상 최대 1000자 이내로 입력해주세요');
    if (type === 'update') {
      examInfoUpdate.mutate();
    } else {
      examWriting.mutate();
    }
    setModalIsOpen(false);
  };

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
          <ContentTitleWrapper>
            <ContentTitle id="title">수강학기</ContentTitle>
            <SemesterSelect
              list={semesters(row.semesterList)}
              selected={selectedSemester}
              setSelect={setSelectedSemester}
            />
          </ContentTitleWrapper>
          <ContentTitleWrapper>
            <ContentTitle id="title">시험종류</ContentTitle>
            <SemesterSelect list={examTypes} selected={examType} setSelect={setExamType} />
          </ContentTitleWrapper>
        </Content>
        <MobileContent>
          <MobileContent id="semester">
            <ContentTitle id="mobile">수강학기</ContentTitle>
            <SemesterSelect
              list={semesters(row.semesterList)}
              selected={selectedSemester}
              setSelect={setSelectedSemester}
            />
          </MobileContent>
          <MobileContent id="semester">
            <ContentTitle id="mobile">시험종류</ContentTitle>
            <SemesterSelect list={examTypes} selected={examType} setSelect={setExamType} />
          </MobileContent>
        </MobileContent>

        {ExamSelectOptions.map(({ id, title, subTitle, type, options }) => (
          <Content key={id} id="content" onChange={handleChange}>
            <ContentTitle id={id}>
              {title}
              {subTitle && <SmallTitle>{subTitle}</SmallTitle>}
            </ContentTitle>
            <GridContainer id={id}>
              {options.map(({ id: level, name, value }) => (
                <label key={name}>
                  <FormCheckLeft
                    type={type}
                    name={id}
                    id={level}
                    value={value}
                    defaultChecked={examOptions[id as WriteTestProps].includes(value)}
                  />
                  <FormCheckText>{name}</FormCheckText>
                </label>
              ))}
            </GridContainer>
          </Content>
        ))}
      </ContentWrapper>
      <TextField
        placeholder="시험에 대한 정보, 공부법, 문제유형 등을 자유롭게 작성해주세요 :)"
        defaultValue={row.content}
        onChange={(e) => setContent(e.target.value)}
        rows={15}
      />
      <Wrapper id="button">
        <EditButton onClick={onTest}>
          {type === 'write' ? '작성하기 (+20P)' : '수정하기'}
        </EditButton>
      </Wrapper>
    </Wrapper>
  );
};
export default WriteTestInfo;

const Wrapper = styled.div`
  display: flex;

  flex-direction: column;
  width: 100%;
  &#button {
    align-items: center;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem 0;
  &#examDifficulty {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Title = styled.div`
  font-size: 18px;
  padding: 2rem 1.5rem 1rem;
  font-weight: 500;
  @media only screen and (max-width: 550px) {
    padding: 1rem;
  }
`;
const TitleButton = styled.button`
  font-size: 18px;
  padding: 2rem 1.5rem 1rem;
  font-weight: 500;
  border: none;
  border-radius: 15px;
  background-color: white;
  cursor: pointer;
  @media only screen and (max-width: 550px) {
    padding: 1rem;
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
  margin: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  @media only screen and (max-width: 550px) {
    padding-left: 0rem;
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

const MobileContent = styled.div`
  display: none;
  @media only screen and (max-width: 550px) {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    &#semester {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
`;

const ContentTitle = styled.div`
  width: 25%;
  &#title {
    @media only screen and (max-width: 1100px) {
      width: 100%;
    }
  }
  &#examInfo {
    margin-bottom: auto;
  }
`;

const ContentTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  @media only screen and (max-width: 1100px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SmallTitle = styled.div`
  font-size: 12px;
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
    min-height: 150px;
    font-size: 16px;
    transform: scale(0.86);
  }
`;

const EditButton = styled.div`
  font-size: 16px;

  font-weight: 600;
  width: 350px;
  padding: 12px 20px;
  text-align: center;
  color: #ffffff;
  background-color: #336af8;
  border-radius: 15px;
  &:hover {
    cursor: pointer;
  }
  @media only screen and (max-width: 550px) {
    width: 80%;
    margin-bottom: 20px;
  }
`;

const FormCheckText = styled.span`
  font-size: 1vw;
  padding: 8px 15px;
  background: #eee;
  border-radius: 10px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #777;
  margin-right: 8px;
  @media only screen and (max-width: 1100px) {
    font-size: 12px;
    padding: 6px 9px;
  }
`;

const FormCheckLeft = styled.input`
  &#difficult {
    &:checked + ${FormCheckText} {
      color: #7800ff;
      font-weight: 600;
    }
  }
  &#normal {
    &:checked + ${FormCheckText} {
      color: #222222;
      font-weight: 600;
    }
  }
  &#easy {
    &:checked + ${FormCheckText} {
      color: #336af8;
      font-weight: 600;
    }
  }
  display: none;
`;
