import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  return (
    <BrowserRouter>
      <div className='paths'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
