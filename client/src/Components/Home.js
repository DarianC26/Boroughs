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
      <div className='slogan-text'>
        <div className='typewriter'>
          <h1>Imagine a place</h1>
        </div>
      </div>
    </div>
  );
}
