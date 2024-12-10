import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from '../pages/login-page/LoginPage';
import SignupPage from '../pages/signup-page/SignupPage';
import ResetPswdPage from '../pages/reset-pswd-page/ResetPswdPage';
import Dashboard from '../pages/dashboard/Dashboard';
import ProfilePage from '../pages/profile-page/ProfilePage';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<ResetPswdPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </div>
  );
};
