import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Start from './pages/start/start';
import './App.css'
import Home from './pages/home/home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Start />} />
        <Route path="/login" element={<Start />} />
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
