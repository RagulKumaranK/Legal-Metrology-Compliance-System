import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthInspectionProvider, useAuthInspection } from './context/AuthInspectionContext';
import MobileFrame from './components/MobileFrame';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ScanOptions from './pages/ScanOptions';
import ScanCamera from './pages/ScanCamera';
import ScanEcommerce from './pages/ScanEcommerce';
import ScanPreview from './pages/ScanPreview';
import ScanResult from './pages/ScanResult';
import History from './pages/History';
import Profile from './pages/Profile';
import EvidenceReview from './pages/EvidenceReview';
import InspectionDetail from './pages/InspectionDetail';
import ReportPreview from './pages/ReportPreview';
import Settings from './pages/Settings';
import ViolationDetails from './pages/ViolationDetails';
import AdminDashboard from './pages/AdminDashboard';

// Route Guard Component
function ProtectedRoute({ children }) {
  const { officer } = useAuthInspection();
  if (!officer || !officer.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AuthGuard({ children }) {
  const { officer } = useAuthInspection();
  if (officer && officer.isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

function AppRoutes() {
  const { officer } = useAuthInspection();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<AuthGuard><Login /></AuthGuard>} />
      <Route path="/register" element={<Register />} />

      {/* Authenticated Screens */}
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path="/scan" element={
        <ProtectedRoute><ScanOptions /></ProtectedRoute>
      } />
      <Route path="/scan-camera" element={
        <ProtectedRoute><ScanCamera /></ProtectedRoute>
      } />
      <Route path="/scan-ecommerce" element={
        <ProtectedRoute><ScanEcommerce /></ProtectedRoute>
      } />
      <Route path="/scan-preview" element={
        <ProtectedRoute><ScanPreview /></ProtectedRoute>
      } />
      <Route path="/scan-result" element={
        <ProtectedRoute><ScanResult /></ProtectedRoute>
      } />
      <Route path="/evidence-review" element={
        <ProtectedRoute><EvidenceReview /></ProtectedRoute>
      } />
      <Route path="/evidence" element={
        <ProtectedRoute><EvidenceReview /></ProtectedRoute>
      } />
      <Route path="/inspection-detail" element={
        <ProtectedRoute><InspectionDetail /></ProtectedRoute>
      } />
      <Route path="/inspection" element={
        <ProtectedRoute><InspectionDetail /></ProtectedRoute>
      } />
      <Route path="/report-preview" element={
        <ProtectedRoute><ReportPreview /></ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute><Settings /></ProtectedRoute>
      } />
      <Route path="/violation-details" element={
        <ProtectedRoute><ViolationDetails /></ProtectedRoute>
      } />
      <Route path="/history" element={
        <ProtectedRoute><History /></ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute><Profile /></ProtectedRoute>
      } />
      <Route path="/admin" element={
        <ProtectedRoute><AdminDashboard /></ProtectedRoute>
      } />

      {/* Catch-all Fallback */}
      <Route path="*" element={<Navigate to={officer && officer.isLoggedIn ? "/dashboard" : "/login"} replace />} />
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
