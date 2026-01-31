// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import FeedPage from './pages/FeedPage'
import SearchPage from './pages/SearchPage'
import ProviderProfile from './pages/ProviderProfile'
import BookingPage from './pages/BookingPage'
import LoginModal from './components/features/auth/LoginModal'
import AuthProvider from './contexts/AuthContext'
import DashboardPage from './pages/DashboardPage'
import CreateServicePage from './pages/CreateServicePage'
import SavedPage from './pages/SavedPage'
import MessagesPage from './pages/MessagesPage'
import ProviderDashboardPage from './pages/ProviderDashboardPage'
import AuthPage from './pages/AuthPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              borderRadius: '12px',
            },
          }}
        />
        <LoginModal />
        <Routes>
          {/* Root path redirects to feed */}
          <Route path="/" element={<Navigate to="/feed" replace />} />
          
          {/* Homepage available at /home for marketing */}
          <Route path="/home" element={<HomePage />} />
          
          {/* Auth page */}
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Main app routes WITH Layout (has navbar) */}
          <Route element={<Layout />}>
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/provider/:id" element={<ProviderProfile />} />
            <Route path="/book/:serviceId" element={<BookingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create" element={<CreateServicePage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/provider-dashboard" element={<ProviderDashboardPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App