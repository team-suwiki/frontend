import styled from '@emotion/styled';
import useUserStore from 'hooks/useUserStore';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Nav = () => {
  const { isLogin, logout } = useUserStore();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick((prevClick) => !prevClick);

  return (
    <Navbar>
      <NavLogoContainer>
        <picture>
          <source srcSet="/images/logo.avif" type="image/avif" />
          <source srcSet="/images/logo.webp" type="image/webp" />
          <source srcSet="/images/logo.png" type="image/png" />
          <NavLogo
            src="/images/logo.png"
            alt="logo"
            width={110}
            height={30}
            onClick={() => navigate('/')}
          />
        </picture>
        <MobileIcon onClick={handleClick}>
          {click ? (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.116 8l-4.558 4.558.884.884L8 8.884l4.558 4.558.884-.884L8.884 8l4.558-4.558-.884-.884L8 7.116 3.442 2.558l-.884.884L7.116 8z"
              ></path>
            </svg>
          ) : (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path>
            </svg>
          )}
        </MobileIcon>

        <NavMenu onClick={handleClick} click={click}>
          <NavLinks onClick={() => navigate('/notice')}>공지사항</NavLinks>
          {!isLogin ? (
            <NavLinks onClick={() => navigate('/login')}>로그인</NavLinks>
          ) : (
            <NavLinks onClick={logout}>로그아웃</NavLinks>
          )}
          {!isLogin ? (
            <NavLinks id="signup" onClick={() => navigate('/signup')}>
              회원가입
            </NavLinks>
          ) : (
            <NavLinks id="signup" onClick={() => navigate('/myinfo')}>
              내 정보
            </NavLinks>
          )}
        </NavMenu>
      </NavLogoContainer>
    </Navbar>
  );
};

export default Nav;

const Navbar = styled.nav`
  min-height: 60px;
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 20px;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.8);
`;

const NavLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1024px;
  margin: 0 auto;
`;

const NavLogo = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

const MobileIcon = styled.div`
  font-size: 2rem;
  align-items: center;
  color: #336af8;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const NavMenu = styled.div<{ click: boolean }>`
  display: flex;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 60px;
    left: ${({ click }) => (click ? 0 : '-100%')};
    transition: all 0.5s ease;
    background: #ffffff;
    z-index: 999;
  }
`;

const NavLinks = styled.div`
  font-size: 1rem;
  font-weight: 500;
  &:hover {
    cursor: pointer;
  }
  &#signup {
    color: #336af8;
  }

  @media screen and (max-width: 768px) {
    text-align: center;
    padding: 2rem;
    display: table;
    &:hover {
      color: #4b89dc;
      transition: all 0.3s ease;
    }
  }
`;
