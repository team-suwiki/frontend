import styled from '@emotion/styled';
import { User } from 'api';
import { EvaluationDetail, Spinner } from 'components';
import { fakeEvaluationList } from 'constants/placeholderData';
import useLectureQuery from 'hooks/useLectureQuery';
import { Fragment, useState } from 'react';
import StarRatings from 'react-star-ratings';
import type { Review } from 'types/evaluate';
import { floatFix } from 'utils/floatFix';
import { isLoginStorage } from 'utils/loginStorage';

export const FakeList = () => {
  return (
    <Wrapper>
      <div style={{ filter: 'blur(10px)' }}>
        {fakeEvaluationList.slice(0, 3).map((lecture) => (
          <Subject key={lecture.id} lecture={lecture} />
        ))}
      </div>
    </Wrapper>
  );
};

const SearchEvaluationList = () => {
  const { evaluation } = useLectureQuery();
  const { data, isLoading, isFetchingNextPage, ref } = evaluation;
  const isLogin = isLoginStorage();

  if (isLoading) return <Spinner id="nextPage" />;

  const count = data?.pages[0]?.data.length;

  if (!isLogin) {
    return <FakeList />;
  }

  if (count === 0) {
    return (
      <Wrapper>
        <Content>등록된 강의평가가 없어요</Content>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div style={{ filter: !isLogin ? 'blur(10px)' : undefined }}>
        {data?.pages?.map((page, index) => (
          <Fragment key={index}>
            {page?.data.map((lecture) => <Subject key={lecture.id} lecture={lecture} />)}
          </Fragment>
        ))}
        <div ref={ref} style={{ marginBottom: '10px' }}>
          {isFetchingNextPage ? <Spinner id="nextPage" /> : null}
        </div>
      </div>
    </Wrapper>
  );
};

export const Subject = ({ lecture }: { lecture: Review }) => {
  const user = User();
  const [modal, setModal] = useState(false);
  const onReport = () => {
    if (window.confirm('정말 신고하시겠어요? \n*허위 신고 시 제재가 가해질 수 있습니다!'))
      user.reportEvaluation({ evaluateIdx: lecture.id, content: '신고' });
  };

  return (
    <div style={{ marginTop: '15px' }}>
      <LectureWrapper>
        <MarginTop id="top">
          <TitleWrapper>
            <YearText>{lecture.selectedSemester}</YearText>
          </TitleWrapper>
          <EditButton onClick={onReport}>신고</EditButton>
          <StarRatings
            rating={lecture.totalAvg}
            starRatedColor="#336af8"
            numberOfStars={5}
            name="rating"
            starDimension="18px"
            starSpacing="0px"
            svgIconPath="M17.563,21.56a1,1,0,0,1-.466-.115L12,18.765l-5.1,2.68a1,1,0,0,1-1.451-1.054l.974-5.676L2.3,10.7A1,1,0,0,1,2.856,8.99l5.7-.828L11.1,3A1.04,1.04,0,0,1,12.9,3l2.549,5.164,5.7.828A1,1,0,0,1,21.7,10.7l-4.124,4.02.974,5.676a1,1,0,0,1-.985,1.169Z"
            svgIconViewBox="0 0 24 24"
          />
          <Rate>{floatFix(lecture.totalAvg, 1)}</Rate>
          <ModalOpen
            onClick={() => {
              setModal(!modal);
            }}
          >
            {modal ? '간략히' : '자세히'}
          </ModalOpen>
        </MarginTop>
        <MobileWrapper>
          <div style={{ marginBottom: '15px' }}>
            <TitleWrapper>
              <YearText>{lecture.selectedSemester}</YearText>
            </TitleWrapper>
            <EditButton onClick={onReport}>신고</EditButton>
          </div>
          <div>
            <StarRatings
              rating={lecture.totalAvg}
              starRatedColor="#336af8"
              numberOfStars={5}
              name="rating"
              starDimension="18px"
              starSpacing="0px"
              svgIconPath="M17.563,21.56a1,1,0,0,1-.466-.115L12,18.765l-5.1,2.68a1,1,0,0,1-1.451-1.054l.974-5.676L2.3,10.7A1,1,0,0,1,2.856,8.99l5.7-.828L11.1,3A1.04,1.04,0,0,1,12.9,3l2.549,5.164,5.7.828A1,1,0,0,1,21.7,10.7l-4.124,4.02.974,5.676a1,1,0,0,1-.985,1.169Z"
              svgIconViewBox="0 0 24 24"
            />
            <Rate>{floatFix(lecture.totalAvg, 1)}</Rate>
            <ModalOpen
              onClick={() => {
                setModal(!modal);
              }}
            >
              {modal ? '간략히' : '자세히'}
            </ModalOpen>
          </div>
        </MobileWrapper>

        <div style={{ marginBottom: '5px' }} />
        {modal && <EvaluationDetail lecture={lecture} />}
        <MarginTop id="bottom">
          <EvaluationText>
            {lecture.content.split('\n').map((value, index) => (
              <div key={index}>
                {value}
                <br />
              </div>
            ))}
          </EvaluationText>
        </MarginTop>
      </LectureWrapper>
    </div>
  );
};

export default SearchEvaluationList;

const ModalOpen = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #222;
  text-decoration: underline;
  margin-left: 11px;
  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Content = styled.div`
  font-size: 1.5rem;
  margin: 2rem 0;

  font-weight: 600;
  text-align: center;
  margin-top: 10rem;
  @media screen and (max-width: 550px) {
    font-size: 1rem;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  float: left;
  align-items: center;
`;

const Rate = styled.span`
  color: #336af8;

  font-size: 18px;
  font-weight: 500;
  padding-left: 5px;
  &#modal {
    font-size: 16px;
    padding-left: 0px;
  }
`;

const LectureWrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const MarginTop = styled.div`
  &#top {
    padding: 14px 24px 0px 24px;
    @media only screen and (max-width: 550px) {
      display: none;
    }
  }
  &#bottom {
    padding: 0px 24px 14px 24px;
    margin-top: 5px;
  }
`;

const MobileWrapper = styled.div`
  display: none;
  @media only screen and (max-width: 550px) {
    display: flex;
    padding: 14px 24px 0px 24px;
    flex-direction: column;
  }
`;

const YearText = styled.span`
  font-weight: 400;
  font-size: 14px;
  padding: 4.5px 13px 4.5px 13px;
  border-radius: 12.5px;
  background-color: #eee;
  margin-right: 12px;
`;

const EvaluationText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;

  font-weight: 400;
  line-height: 1.3;
  font-size: 1rem;
  padding-top: 0.7rem;
  word-break: break-all;
`;

const EditButton = styled.span`
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: #a3a3a3;
  float: right;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`;
