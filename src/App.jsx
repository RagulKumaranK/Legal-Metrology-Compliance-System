import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthInspectionProvider, useAuthInspection } from './context/AuthInspectionContext';
import MobileFrame from './components/MobileFrame';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ScanCamera from './pages/ScanCamera';
import ScanPreview from './pages/ScanPreview';
import ScanResult from './pages/ScanResult';
import History from './pages/History';
import Profile from './pages/Profile';

// Route Guard Component
function ProtectedRoute({ children }) {
  const { officer } = useAuthInspection();
  if (!officer || !officer.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppRoutes() {
  return (
    <Routes>
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
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthInspectionProvider>
      <BrowserRouter>
        <MobileFrame>
          <AppRoutes />
        </MobileFrame>
      </BrowserRouter>
    </AuthInspectionProvider>
  );
}
