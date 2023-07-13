import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {

    const [input, setInput] = useState('');

    function getData(e) {
        axios.get('http://localhost:3001/getUsers', {params: {search: e}}).then((response) => {
            let results = response;
            console.log(results);
        })
    }

    function handleChange(e) {
        setInput(e);
        getData(e)
    }

    return (
    <nav>
        <div className='nav-background-container'>
            <div className='nav-container'>

                <div className='logo-div'>
                    <Link className='logo-link' to='/'>boroughs</Link>
                </div>

                <div className='search-bar'>
                    <input type='search' placeholder='Search Boroughs' value={input} onInput={(e) => handleChange(e.target.value)}></input>
                </div>

                <div className='s-button'>
                    <Link className='profile-link' to='/profile'>Profile</Link>
                </div>

            </div>
        </div>
    </nav>
    )
}
