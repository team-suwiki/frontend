import { RouterProvider } from 'react-router';

import { router } from './__generated__/routes.generated';

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
