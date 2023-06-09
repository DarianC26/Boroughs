import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Feed from './Components/Feed';
import Post from './Components/Subcomponents/PostDetail'

function App() {
  return (
    <BrowserRouter>
      <div className='paths'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/feed' element={<Feed />}></Route>
          <Route path='/post/:postId' element={<Post />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
