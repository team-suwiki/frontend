import './styles/globalStyle.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AsyncBoundary from 'components/AsyncBoundary';
import { BadGateway } from 'pages';
import ReactDOM from 'react-dom/client';
import { initialize } from 'react-ga';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

initialize('G-KG7KQ8K3GP');

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AsyncBoundary pendingFallback={<></>} rejectedFallback={() => <BadGateway />}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </AsyncBoundary>,
);
