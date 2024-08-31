import { useEffect, useState } from 'react';
import { initialize, pageview } from 'react-ga';
import { useLocation } from 'react-router-dom';

const RouteChangeTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      initialize('G-KG7KQ8K3GP');
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      pageview(location.pathname + location.search);
    }
  }, [initialized, location]);

  return null;
};

export default RouteChangeTracker;
