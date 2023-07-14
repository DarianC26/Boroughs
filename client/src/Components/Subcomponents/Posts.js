import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Posts.css';
import axios from 'axios';

function Posts({post}) {

  const logged = localStorage.getItem("user");

  return (
    <div className='indiv-post-container'>
      <Link className='detail-link' to={`/post/${post._id}`}>
          <div className='indiv-post'>
            <div className='poster-tag'>
              <h6>Posted by <b>{post.poster}</b> to <b>{post.comm_name}</b> community</h6>
              </div>
            <div className='post-title'><h3>{post.title}</h3></div>
              <div className='post-content'>
                  <h5>{post.description}</h5>
              </div>
          </div>
      </Link>
    </div>
  )
}

export default Posts