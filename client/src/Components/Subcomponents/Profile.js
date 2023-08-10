import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate , useParams, useLocation, useSearchParams } from 'react-router-dom'

export default function Profile() {

    const { userId } = useParams()
    const [post, setPost] = useState('')
    const logged = localStorage.getItem("user");
    const [searchParams] = useSearchParams();
    const username = searchParams.get('user');
    const [user, setUser] = useState('');

    useEffect(() => {
        if(username != null) {
        axios.get('http://localhost:3001/getUser', {params: {username: username}}).then((response) => {
            setUser(response.data[0]);
        })
        }
        else {
            setUser(JSON.parse(logged));
        }
    })

    function addFriend() {
        axios.post('http://localhost:3001/addFriend', {
            user
        })
    }

    return (
        <div className='profile-container'>
            <div className='username-container'>{user.username}</div>
            <br></br>
            <div className='username-container'>{user.email}</div>
            <br></br>
            <div className='username-container'>{user.firstName}</div>
            <br></br>
            <div className='username-container'>{user.lastName}</div>
            <br></br>
            <div className='username-container'>{user.age}</div>
            <button className='add-friend-button' onClick={addFriend}>Add Friend</button>
        </div>
    )
}
