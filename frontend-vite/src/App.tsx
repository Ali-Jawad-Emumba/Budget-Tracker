import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login-page/LoginPage';
import SignupPage from './pages/signup-page/SignupPage';
import ForgotPswdPage from './pages/reset-pswd-page/ForgotPswdPage';
import Dashboard from './pages/dashboard/Dashboard';
import ProfilePage from './pages/profile-page/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import { checkTokenExpiration, startTokenCheckInterval } from './utils/shared';
import ResetPswdPage from './pages/reset-pswd-page/ResetPswdPage';
import { useSelector } from 'react-redux';

export const App = () => {
  const keepMeLoggedIn=useSelector((state:any)=>state.keepLoggedIn)
  useEffect(() => {
    const interval = startTokenCheckInterval(keepMeLoggedIn);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPswdPage />} />
          <Route path="/reset-password" element={<ResetPswdPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};
