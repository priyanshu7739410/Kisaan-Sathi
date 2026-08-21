import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Onboarding } from './pages/Onboarding';
import { Calendar } from './pages/Calendar';
import { Diagnostic } from './pages/Diagnostic';
import { Chat } from './pages/Chat';
import { useAuthStore } from './store/authStore';
import './index.css';

const queryClient = new QueryClient();

export default function App() {
  const { isAuthenticated, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/onboarding" element={!isAuthenticated ? <Onboarding /> : <Navigate to="/" />} />
          
          <Route element={<Layout />}>
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/onboarding" />} />
            <Route path="/calendar" element={isAuthenticated ? <Calendar /> : <Navigate to="/onboarding" />} />
            <Route path="/diagnostic" element={isAuthenticated ? <Diagnostic /> : <Navigate to="/onboarding" />} />
            <Route path="/chat" element={isAuthenticated ? <Chat /> : <Navigate to="/onboarding" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
