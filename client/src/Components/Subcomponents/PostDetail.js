import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate , useParams, useLocation } from 'react-router-dom'

export default function PostDetail() {

    const { postId } = useParams()
    const [post, setPost] = useState('')
    const logged = localStorage.getItem("user");

    useEffect(() => {
        axios.get(`http://localhost:3001/getPost/${postId}`).then((response) => {
            setPost(response.data);
        })
    }, []);

    useEffect(() => {
        var buttonEl = document.createElement("button");
        buttonEl.onclick = deletePost;
        var buttonTextEl = document.createElement("span");
        buttonTextEl.className = "del-button";
        buttonTextEl.innerText = "Delete Post";
        buttonEl.appendChild(buttonTextEl);
        if (JSON.parse(logged)._id === post.poster) {
          document.getElementById("test").appendChild(buttonEl);
        }
      })

    function deletePost() {
        axios.delete(`http://localhost:3001/deletePost/${post._id}`).then((response) => {
          console.log(response);
          window.location.href = 'http://localhost:3000/feed';
        });
      }

    return (
        <div id='test' className='id'>
            {post.description}
        </div>
    );
}

