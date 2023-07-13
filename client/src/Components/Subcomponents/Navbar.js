import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav>
        <div className='nav-background-container'>
            <div className='nav-container'>
            <Link className='logo-link' to='/'>boroughs</Link>
            <div className='search-bar'>
                <input type='search' placeholder='Search Boroughs'></input>
            </div>

            <div className='s-button'>
                <Link className='profile-link' to='/profile'>Profile</Link>
            </div>
            </div>
        </div>
    </nav>
  )
}
