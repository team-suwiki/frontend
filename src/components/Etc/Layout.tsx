import Footer from 'components/Footer';
import Nav from 'components/Nav';
import RouteChangeTracker from 'components/RouteChangeTracker';
import { useHttp } from 'hooks/useHttp';

import ScrollButton from './ScrollButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useHttp();

  return (
    <>
      <RouteChangeTracker />
      <Nav />
      {children}
      <ScrollButton />
      <Footer />
    </>
  );
};

export default Layout;
