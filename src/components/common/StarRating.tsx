import styled from '@emotion/styled';
import { useId } from 'react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showScore?: boolean;
  className?: string;
}

/**
 * 별점을 표시하는 컴포넌트 (React 19 최적화)
 * @param rating 별점 (0-5)
 * @param maxRating 최대 별점 (기본값: 5)
 * @param size 별 크기 (px, 기본값: 20)
 * @param showScore 점수 표시 여부 (기본값: false)
 */
export const StarRating = ({
  rating,
  maxRating = 5,
  size = 20,
  showScore = false,
  className,
}: StarRatingProps) => {
  const formattedRating = Math.round(rating * 10) / 10;

  return (
    <Container className={className}>
      <StarContainer>
        {Array.from({ length: maxRating }, (_, index) => {
          const fillAmount = Math.max(0, Math.min(1, rating - index));

          return <Star key={index} size={size} fillAmount={fillAmount} />;
        })}
      </StarContainer>
      {showScore ? <ScoreWrapper>{formattedRating}</ScoreWrapper> : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StarContainer = styled.div`
  display: flex;
  gap: 2px;
`;

interface StarProps {
  size: number;
  fillAmount: number;
}

const Star = ({ size, fillAmount }: StarProps) => {
  const FILL_COLOR = '#4169E1';
  const EMPTY_COLOR = '#E0E0E0';

  const uniqueId = useId();
  const clipId = `star-clip-${uniqueId}`;

  return (
    <StarWrapper size={size}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'hidden' }}
      >
        <defs>
          <linearGradient id={clipId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset={`${fillAmount * 100}%`} stopColor={FILL_COLOR} />
            <stop offset={`${fillAmount * 100}%`} stopColor={EMPTY_COLOR} />
          </linearGradient>
        </defs>

        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill={`url(#${clipId})`}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </StarWrapper>
  );
};

const StarWrapper = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ScoreWrapper = styled.span`
  margin-left: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #4169e1;
`;
