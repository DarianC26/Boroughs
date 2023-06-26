import React from 'react';
import { Link } from 'react-router-dom';
import './Posts.css';

function Posts({post}) {
  return (
    <Link to={`/post/${post._id}`}>
        <div className='indiv-post'>
            <div className='post-content'>
                {post.description}
            </div>
        </div>
    </Link>
  )
}

export default Posts