import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import SecondHandItems from './components/SecondHandItems';
import NotPaylasim from './components/NotPaylasim';
import NewAd from './components/NewAd';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ikincielesya" element={<SecondHandItems />} />
        <Route path="/notpaylasim" element={<NotPaylasim />} /> 
        <Route path="/new-ad" element={<NewAd/>} />

      </Routes>
    </Router>
  );
}

export default App;
