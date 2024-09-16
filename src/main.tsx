import './styles/globalStyle.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import AsyncBoundary from 'components/AsyncBoundary';
import { BadGateway } from 'pages';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { initialize } from 'react-ga';
import { RecoilRoot } from 'recoil';

import App from './App';

initialize('G-KG7KQ8K3GP');

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});
const PROXY_URL = window.location.hostname === 'localhost' ? '/api' : '/proxy';

axios.defaults.baseURL = PROXY_URL;
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AsyncBoundary pendingFallback={<></>} rejectedFallback={() => <BadGateway />}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AsyncBoundary>
  </React.StrictMode>,
);
