import React from 'react'
import axios from 'axios';
import './Feed.css';
import Navbar from './Subcomponents/Navbar';

export default function Feed() {
  return (
    <div className='feed-container'>
        <Navbar />
        <div className='feed-content'>
            <div className='side1'>
                <div className='profile-corner'>
                </div>
            </div>
            <div className='center'>
                <div className='posts'>
                    
                </div>
            </div>
            <div className='side2'></div>
        </div>
    </div>
  )
}
