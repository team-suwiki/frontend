import './styles/globalStyle.css';

import {
  QueryClient as QueryClient5,
  QueryClientProvider as QueryClientProvider5,
} from '@tanstack/react-query';
import axios from 'axios';
import AsyncBoundary from 'components/AsyncBoundary';
import { BadGateway } from 'pages';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { initialize } from 'react-ga';
import {
  QueryClient as QueryClient4,
  QueryClientProvider as QueryClientProvider4,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';

import App from './App';

initialize('G-KG7KQ8K3GP');

export const queryClient = new QueryClient4();
const queryClient5 = new QueryClient5();
const PROXY_URL = window.location.hostname === 'localhost' ? '/api' : '/proxy';

axios.defaults.baseURL = PROXY_URL;
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AsyncBoundary pendingFallback={<></>} rejectedFallback={() => <BadGateway />}>
      <QueryClientProvider4 client={queryClient}>
        <QueryClientProvider5 client={queryClient5}>
          <RecoilRoot>
            <App />
            <ReactQueryDevtools />
          </RecoilRoot>
        </QueryClientProvider5>
      </QueryClientProvider4>
    </AsyncBoundary>
  </React.StrictMode>,
);
