import './App.css';
import React from 'react';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Offers from './pages/Offers';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Profile from './components/Layout/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/Layout/PrivateRoute';
import ForgetPassword from './pages/ForgotPassword';
function App() {
  return (
    
      <BrowserRouter>
        <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<PrivateRoute/>}> 
          <Route path='/profile' element={<Profile/>} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
      </Routes>
      </BrowserRouter>
      
  );
}

export default App;
