import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Posts.css';

function Posts({post}) {

  useEffect(() => {

  });

  return (
    <div className='indiv-post-container'>
      <Link to={`/post/${post._id}`}>
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