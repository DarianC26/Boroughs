import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './Components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className='paths'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
