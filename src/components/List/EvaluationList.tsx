import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { deleteEvaluation, evaluateList } from 'api/User';
import { EvaluationDetail, Modal, Spinner, WriteEvaluation } from 'components';
import { CACHE_TIME } from 'constants/cacheTime';
import useUserStore from 'hooks/useUserStore';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import StarRatings from 'react-star-ratings';
import type { Review } from 'types/evaluate';
import { floatFix } from 'utils/floatFix';
import { subStr } from 'utils/subString';

const EvaluationList = () => {
  const { isLogin } = useUserStore();
  const { ref, inView } = useInView();
  // 내가 작성한 평가
  const { data, isLoading, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['myInfo', 'myEvaluation'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => evaluateList(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage && !lastPage.isLast) return lastPage.nextPage;

      return undefined;
    },
    enabled: isLogin,
    gcTime: CACHE_TIME.MINUTE_30,
    staleTime: CACHE_TIME.MINUTE_30,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isLoading) return <Spinner id="myInfo" />;
  const isExistData = data?.pages[0]?.data.length === 0;

  return (
    <>
      {isExistData ? (
        <NoEvaluation>아직 평가한 강의가 없어요.</NoEvaluation>
      ) : (
        data?.pages.map((page, index) => {
          return (
            <Wrapper key={index}>
              {page?.data.map((row) => <EvaluationCard key={row.id} row={row} />)}
            </Wrapper>
          );
        })
      )}
      <div ref={ref} style={{ marginBottom: '10px' }}>
        {isFetchingNextPage ? <Spinner id="nextPage" /> : null}
      </div>
    </>
  );
};

export const EvaluationCard = ({ row }: { row: Review }) => {
  const [modal, setModal] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const title = subStr(row.lectureName!, 14);
  const mobileTitle = subStr(row.lectureName!, 8);

  const onDelete = () => {
    if (window.confirm('강의평가를 삭제하시겠습니까?')) deleteEvaluation(row.id!.toString());
  };

  return (
    <div style={{ marginTop: '15px' }}>
      <LectureWrapper>
        <MarginTop id="top">
          <MobileWrapper id="top">
            <YearText>{row.selectedSemester}</YearText>
            <div>
              <DeleteButton onClick={onDelete}>삭제</DeleteButton>
              <EditButton onClick={() => setModalIsOpen(true)}>수정</EditButton>
            </div>
          </MobileWrapper>
          <MobileWrapper>
            <Title>{mobileTitle}</Title>
            <Major>{row.majorType}</Major>
            <Major id="border">|</Major>
            <Professor>{row.professor}</Professor>
          </MobileWrapper>

          <TitleWrapper>
            <YearText>{row.selectedSemester}</YearText>
            <Title>{title}</Title>
            <Major>{row.majorType}</Major>
            <Major id="border">|</Major>
            <Professor>{row.professor}</Professor>
          </TitleWrapper>
          <DeleteButton id="pc" onClick={onDelete}>
            삭제
          </DeleteButton>
          <EditButton id="pc" onClick={() => setModalIsOpen(true)}>
            수정
          </EditButton>

          <div style={{ marginBottom: '38px' }} />
          <StarRatings
            rating={row.totalAvg}
            starRatedColor="#336af8"
            numberOfStars={5}
            name="rating"
            starDimension="18px"
            starSpacing="0px"
            svgIconPath="M17.563,21.56a1,1,0,0,1-.466-.115L12,18.765l-5.1,2.68a1,1,0,0,1-1.451-1.054l.974-5.676L2.3,10.7A1,1,0,0,1,2.856,8.99l5.7-.828L11.1,3A1.04,1.04,0,0,1,12.9,3l2.549,5.164,5.7.828A1,1,0,0,1,21.7,10.7l-4.124,4.02.974,5.676a1,1,0,0,1-.985,1.169Z"
            svgIconViewBox="0 0 24 24"
          />
          <Rate>{floatFix(row.totalAvg!, 1)}</Rate>
          <ModalOpen
            onClick={() => {
              setModal((prevModal) => !prevModal);
            }}
          >
            {modal ? '간략히' : '자세히'}
          </ModalOpen>
        </MarginTop>
        {modal && <EvaluationDetail lecture={row} />}
        <MarginTop id="bottom">
          <EvaluationText>
            {row.content.split('\n').map((value, index) => {
              return (
                <div key={index}>
                  {value}
                  <br />
                </div>
              );
            })}
          </EvaluationText>
        </MarginTop>
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
          <WriteEvaluation type="update" setModalIsOpen={setModalIsOpen} row={row} />
        </Modal>
      </LectureWrapper>
    </div>
  );
};

export default EvaluationList;

const ModalOpen = styled.span`
  font-size: 12px;

  font-weight: 400;
  color: #222222;
  text-decoration: underline;
  margin-left: 11px;
  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  margin: 0px 20px;
`;

const NoEvaluation = styled.div`
  display: flex;
  height: 80vh;
  align-items: center;
  justify-content: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  float: left;
  align-items: center;
  @media only screen and (max-width: 550px) {
    display: none;
  }
`;

const MobileWrapper = styled.div`
  display: none;
  @media only screen and (max-width: 550px) {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    float: left;
    align-items: center;
    margin-bottom: 10px;
    &#top {
      justify-content: space-between;
    }
  }
`;

const Title = styled.span`
  font-size: 16px;
  margin-right: 8px;
`;

const Major = styled.span`
  font-size: 14px;

  font-weight: 400;
  color: #515151;
  &#border {
    color: #e0e0e0;
    padding: 0px 5px;
  }
`;

const Professor = styled.span`
  font-size: 14px;

  font-weight: 400;
  color: #515151;
`;

const Rate = styled.span`
  color: #336af8;
  font-size: 18px;

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
  }
  &#bottom {
    padding: 0px 24px 14px 24px;
    margin-top: 5px;
  }
`;

const YearText = styled.span`
  font-size: 14px;

  font-weight: 400;
  padding: 4.5px 13px 4.5px 13px;
  border-radius: 12.5px;
  background-color: #eee;
  margin-right: 12px;
`;

const EvaluationText = styled.div`
  display: flex;
  flex-direction: column;

  font-weight: 400;
  line-height: 1.3;
  font-size: 1rem;
  padding-top: 0.7rem;
  word-break: break-all;
`;

const EditButton = styled.span`
  font-size: 12px;

  font-weight: 400;
  text-align: center;
  color: #a3a3a3;
  float: right;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
  &#pc {
    @media only screen and (max-width: 550px) {
      display: none;
    }
  }
`;
const DeleteButton = styled.span`
  font-size: 12px;

  font-weight: 400;
  text-align: center;
  color: #a3a3a3;
  float: right;
  &:hover {
    cursor: pointer;
  }
  &#pc {
    @media only screen and (max-width: 550px) {
      display: none;
    }
  }
`;
