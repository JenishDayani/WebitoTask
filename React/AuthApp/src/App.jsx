import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import ResetPassword from './components/Auth/ResetPassword';
import Profile from './components/Auth/Profile';
import PrivateRoute from './components/Auth/PrivateRoute';
import EditProfile from './components/Auth/EditProfile';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/' element={<Signup />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/edit-profile' element={<EditProfile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
