import React, { useState } from 'react';
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
  );
}
