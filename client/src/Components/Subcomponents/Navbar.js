import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
        <div className='nav-container'>
            <p>boroughs</p>
            <div className='search-bar'>
                <i className='uil uil-search'></i>
                <input type='search' placeholder='Search Boroughs'></input>
            </div>

            <div className='s-button'>
                <a href='https://localhost:3000/profile'>Profile</a>
            </div>
        </div>
    </nav>
  )
}

export default Navbar