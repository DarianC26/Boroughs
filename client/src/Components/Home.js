import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom';

export default function Home() {
  return (
    <div className='container'>
      <div className='home_wrapper'>
        <nav className='nav_bar'>
          <ul className='nav-links'>
                <Link to="/login">
                    <li className='linker'>Login</li>
                </Link>
                <Link to="/signup">
                    <li className='linker'>Sign Up</li>
                </Link>
            </ul>
        </nav>
        <div className='image_wrapper'></div>
      </div>
    </div>
  );
}
