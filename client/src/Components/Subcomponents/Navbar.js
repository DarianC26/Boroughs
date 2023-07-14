import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import './Navbar.css'
import SearchRes from './SearchRes';

export default function Navbar() {

    const [input, setInput] = useState('');
    const [search, setSearch] = useState([]);

    function getData(e) {
        if (e === '') {
            setSearch([]);
        }
        else {
            axios.get('http://localhost:3001/getUsers', {params: {search: e}}).then((response) => {
            let results = response;
            setSearch(results.data);
            console.log(results);
        })
    }
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
                    <input type='search' placeholder='Search Boroughs' value={input} onChange={(e) => handleChange(e.target.value)}></input>
                    <div className='search-res'>
                </div>
                </div>

                <div className='s-button'>
                    <Link className='profile-link' to='/profile'>Profile</Link>
                </div>

            </div>
        </div>
        <div className='search-res'>
                    {search.map((res) => {
                        return <SearchRes key={res.username} res={res} />;
                    })}
        </div>
    </nav>
    )
}
