import axios from 'axios';
import React, { useEffect } from 'react';
import { Link, useNavigate , useParams, useLocation } from 'react-router-dom'

export default function PostDetail() {

    const { postId } = useParams()

    useEffect(() => {
        axios.get("http://localhost:3001/getPost")
    });

    return (
        <div className='id'>
            {postId}
        </div>
    );
}

