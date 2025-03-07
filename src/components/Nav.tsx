import type { RoutePath } from '__generated__/routes.types';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useBodyScrollLock } from 'hooks/useBodyScrollLock';
import useUserStore from 'hooks/useUserStore';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface NavMenuProps {
  isOpen: boolean;
}

const Nav = () => {
  const { isLogin, logout } = useUserStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNavigation = (path: RoutePath) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  useBodyScrollLock(isOpen);

  return (
    <Navbar isOpen={isOpen}>
      <NavLogoContainer>
        <LogoWrapper onClick={() => handleNavigation('/')}>
          <picture>
            <source srcSet="/images/logo.avif" type="image/avif" />
            <source srcSet="/images/logo.webp" type="image/webp" />
            <source srcSet="/images/logo.png" type="image/png" />
            <NavLogo src="/images/logo.png" alt="수위키 로고" height={24} />
          </picture>
        </LogoWrapper>

        <MenuButton
          onClick={handleToggleMenu}
          aria-expanded={isOpen}
          aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          <MenuIconContainer>
            <MenuLine
              animate={isOpen ? 'open' : 'closed'}
              variants={{
                closed: { rotate: 0, translateY: 0 },
                open: { rotate: 45, translateY: 7 },
              }}
              transition={{ duration: 0.3 }}
            />

            <MenuLine
              animate={isOpen ? 'open' : 'closed'}
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.2 }}
            />

            <MenuLine
              animate={isOpen ? 'open' : 'closed'}
              variants={{
                closed: { rotate: 0, translateY: 0 },
                open: { rotate: -45, translateY: -7 },
              }}
              transition={{ duration: 0.3 }}
            />
          </MenuIconContainer>
        </MenuButton>

        <NavMenu isOpen={isOpen}>
          <NavItem onClick={() => handleNavigation('/notice')}>공지사항</NavItem>
          {isLogin ? (
            <NavItem onClick={handleLogout}>로그아웃</NavItem>
          ) : (
            <NavItem onClick={() => handleNavigation('/login')}>로그인</NavItem>
          )}
          {isLogin ? (
            <NavItem isHighlight onClick={() => handleNavigation('/myinfo')}>
              내 정보
            </NavItem>
          ) : (
            <NavItem isHighlight onClick={() => handleNavigation('/signup')}>
              회원가입
            </NavItem>
          )}
        </NavMenu>
      </NavLogoContainer>
    </Navbar>
  );
};

export default Nav;

const Navbar = styled.nav<NavMenuProps>`
  min-height: 60px;
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 20px;
  backdrop-filter: blur(8px);
  background-color: ${({ isOpen }) => (isOpen ? 'white' : 'rgba(255, 255, 255, 0.8)')};
`;

const NavLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1024px;
  margin: 0 auto;
  position: relative;
`;

const LogoWrapper = styled.div`
  cursor: pointer;
`;

const NavLogo = styled.img`
  vertical-align: middle;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 2rem;
  color: #336af8;
  padding: 4px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const NavMenu = styled.div<NavMenuProps>`
  display: flex;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 60px);
    position: fixed;
    top: 60px;
    left: ${({ isOpen }) => (isOpen ? 0 : '-100%')};
    transition: all 0.3s ease;
    background: #ffffff;
    z-index: 10;
    padding: 56px 8px;
    gap: 16px;
  }
`;

const NavItem = styled.button<{ isHighlight?: boolean }>`
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem;
  cursor: pointer;
  color: ${({ isHighlight }) => (isHighlight ? '#336af8' : 'inherit')};
  transition: color 0.2s ease;

  &:hover {
    color: #4b89dc;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    text-align: left;
    padding: 1rem;
    font-size: 24px;
    font-weight: 600;
  }
`;

const MenuIconContainer = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 4px 0;
`;

const MenuLine = styled(motion.div)`
  width: 24px;
  height: 2px;
  background-color: black;
  border-radius: 2px;
  transform-origin: center;
  position: relative;
`;
