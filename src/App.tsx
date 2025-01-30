import { isLoginState } from 'app/recoilStore';
import { RouterProvider } from 'react-router';
import type { MutableSnapshot } from 'recoil';
import { RecoilRoot } from 'recoil';
import { getAccessToken } from 'utils/tokenManeger';

import { router } from './__generated__/routes.generated';

const App = () => {
  const initialState = ({ set }: MutableSnapshot) => {
    const isLogin = !!getAccessToken();
    set(isLoginState, isLogin || false);
  };

  return (
    <RecoilRoot initializeState={initialState}>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
};

export default App;
