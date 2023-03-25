import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom';
import image1 from './images/cloud.png'

function parallaxScroll() {
  let cloud = document.getElementById('clouds');
  window.addEventListener('scroll', () => {
    let value = window.scrollY

    cloud.style.right = value * -1.5 + 'px';
  })
}

export default function Home() {
  return (
    <div className='container'>
      <div className='home_wrapper'>
        <nav className='nav_bar'>
          <ul className='nav_links'>
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
      <div className='transitioning'>
        <img id='clouds' src={image1}></img>
      </div>
      <div className='second_page'>
        <h1>hi</h1>
      </div>
    </div>
  );
}
