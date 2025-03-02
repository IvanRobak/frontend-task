import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/frontend-task">
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-pink-100 to-purple-200">
          <App />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
