import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate , useParams, useLocation } from 'react-router-dom'

export default function PostDetail() {

    const { postId } = useParams()
    const [post, setPost] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:3001/getPost/${postId}`).then((response) => {
            setPost(response.data);
        })
    }, []);

    return (
        <div className='id'>
            {post.description}
        </div>
    );
}

