import styled from '@emotion/styled';
import { useEffect,useState } from 'react';

const ScrollButton = () => {
  const [ScrollY, setScrollY] = useState(0);

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
  };

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setScrollY(0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleFollow);

    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });

  if (ScrollY === 0) return null;

  return (
    <TopButton onClick={handleScroll}>
      <img src="/images/icon_up_arrow_solid_24.svg" alt="upArrow" width="22" height="22" />
    </TopButton>
  );
};

export default ScrollButton;

const TopButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
  border: 1px solid #336af8;
  background-color: white;
  color: #333;
  cursor: pointer;
  padding: 1rem;
  border-radius: 100%;
`;
