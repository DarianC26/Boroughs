import React, { useEffect } from 'react'
import './Home.css'
import {Link} from 'react-router-dom';
import image1 from './images/cloud.png';
import image2 from './images/clouds.png'


export default function Home() {

  function parallaxScroll() {
    let cloud = document.getElementById('cloud');
    let clouds = document.getElementById('clouds');
    window.addEventListener('scroll', () => {
      let value = window.scrollY
  
      cloud.style.right = value * 1.5 + 'px';
      clouds.style.left = value * 1.5 + 'px';
    })
  }

  useEffect(() => {
    parallaxScroll();
  }, []);

  return (
    <div className='home-container'>
      <div className='home-wrapper'>
        <nav className='nav-bar'>
          <ul className='nav-links'>
                <Link to="/login">
                    <li className='linker'>Login</li>
                </Link>
                <Link to="/signup">
                    <li className='linker'>Sign Up</li>
                </Link>
            </ul>
        </nav>
        <div className='image-wrapper'></div>
      </div>
      <div className='transitioning'>
        <img id='cloud' src={image1}></img>
        <img id='clouds' src={image2}></img>
      </div>
      <div className='second-page'>
        <h1>hi</h1>
      </div>
    </div>
  );
}
