import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { initialize, pageview } from 'react-ga';

const RouteChangeTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      initialize('UA-74092126-2');
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
