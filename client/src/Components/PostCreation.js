import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './PostCreation.css';
import Navbar from './Subcomponents/Navbar';
import { useNavigate } from 'react-router-dom';

export default function PostCreation() {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [comm_name, setName] = useState('');
    const [poster, setPoster] = useState('');

    var user;
    var date = '';

    useEffect(() => {
        const logged = localStorage.getItem("user");
        if (logged) {
            user = logged;
            setPoster(JSON.parse(user).username);
        }
    })

    function postToComm() {
        axios.post("http://localhost:3001/createPost", {
            title,
            description,
            poster,
            date,
            comm_name,
        }).then(() => {
            navigate('/feed');
        });
    }

    return (
    <div className='post-creation-container'>
        <div className='navbar-import'>
            <Navbar />
        </div>
        <div className='create-page-container'>
            <div className='create-post-grid'>
                <div className='post-content-body'>
                    <div className='title-community'>
                        <div className='title-section'>
                            <label>Title</label>
                            <input type='text' className='title-input-tag' onInput={e => setTitle(e.target.value)}></input>    
                        </div>
                        <div className='community-section'>
                            <label>Community</label>
                            <input type='text' className='community-input-tag' onInput={e => setName(e.target.value)}></input>
                        </div>
                    </div>
                    <div className='description-body-section'>
                        <label>Description</label>
                        <input type='text' className='description-input-tag' onInput={e => setDescription(e.target.value)}></input>
                        <button className='post-content-button' onClick={postToComm}>Post</button>
                    </div>
                </div>
                <div className='posting-rules'>
                    <div className='rule-block'>
                        Do not post vulgar content
                    </div>
                </div>
            </div>
        </div>
        <div className='post-creation-footer'>
            <button onClick={() => {navigate('/feed')}}>Previous Page</button>
        </div>
    </div>
    )
}
