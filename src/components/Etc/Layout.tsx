import Footer from 'components/Footer';
import Nav from 'components/Nav';
import RouteChangeTracker from 'components/RouteChangeTracker';
import { useHttp } from 'hooks/useHttp';
import { Outlet } from 'react-router';

import ScrollButton from './ScrollButton';

const Layout = () => {
  useHttp();

  return (
    <>
      <RouteChangeTracker />
      <Nav />
      <main>
        <Outlet />
      </main>
      <ScrollButton />
      <Footer />
    </>
  );
};

export default Layout;
