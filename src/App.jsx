import React, { useState, Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthInspectionProvider, useAuthInspection } from './context/AuthInspectionContext';
import MobileFrame from './components/MobileFrame';
import SplashScreen from './components/SplashScreen';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ScanCamera from './pages/ScanCamera';
import ScanPreview from './pages/ScanPreview';
import ScanResult from './pages/ScanResult';
import History from './pages/History';
import Profile from './pages/Profile';

// Error Boundary to prevent white screen crashes
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("LegalMetro App Crash Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          </div>
          <h2 className="text-lg font-bold text-white mb-2">Legal Metrology App Recovery</h2>
          <p className="text-xs text-slate-300 max-w-xs mb-6">
            An unexpected error occurred. Please tap below to restart the application.
          </p>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-lg"
          >
            Restart Application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Protected Route Guard
function ProtectedRoute({ children }) {
  const { officer } = useAuthInspection();
  if (!officer || !officer.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Initial Redirect Helper
function RootRedirect() {
  const { officer } = useAuthInspection();
  if (officer && officer.isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Authenticated Screens */}
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path="/scan" element={
        <ProtectedRoute><ScanCamera /></ProtectedRoute>
      } />
      <Route path="/scan-preview" element={
        <ProtectedRoute><ScanPreview /></ProtectedRoute>
      } />
      <Route path="/scan-result" element={
        <ProtectedRoute><ScanResult /></ProtectedRoute>
      } />
      <Route path="/history" element={
        <ProtectedRoute><History /></ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute><Profile /></ProtectedRoute>
      } />

      {/* Catch-all Fallback */}
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ErrorBoundary>
      <AuthInspectionProvider>
        {showSplash ? (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        ) : (
          <BrowserRouter>
            <MobileFrame>
              <AppRoutes />
            </MobileFrame>
          </BrowserRouter>
        )}
      </AuthInspectionProvider>
    </ErrorBoundary>
  );
}
