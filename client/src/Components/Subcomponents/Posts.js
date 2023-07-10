import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Posts.css';
import axios from 'axios';

function Posts({post}) {

  const logged = localStorage.getItem("user");

  /*
  */

  return (
    <div className='indiv-post-container'>
      <Link className='detail-link' to={`/post/${post._id}`}>
          <div className='indiv-post'>
              <div className='post-content'>
                  {post.description}
              </div>
          </div>
      </Link>
    </div>
  )
}

export default Posts