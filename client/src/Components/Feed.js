import React, {useEffect, useState} from 'react'
import axios from 'axios';
import './Feed.css';
import Post from './Subcomponents/Posts';
import { Link } from 'react-router-dom';

export default function Feed() {

    const [title, setTitle] = useState('Post');
    const [description, setDescription] = useState('');
    const [comm_name, setName] = useState('');
    const [comm_create, setNewComm] = useState('');
    const [postlist, setList] = useState([]);
    const [commlist, setComm] = useState([]);
    const [poster, setPoster] = useState('');
    
    var user;
    var date = '';

    useEffect(() => {
      const logged = localStorage.getItem("user");
      if (logged) {
        user = logged;
        setPoster(JSON.parse(user)._id);

        axios.get("http://localhost:3001/getFeed").then((response) => {
          setList(response.data);
        });
      }
      else {
        window.location.href = 'http://localhost:3000/login';
      }
    }, []);

    useEffect(() => {
      var selectElement = document.getElementById('communityDrop');

      axios.get("http://localhost:3001/getCommunities").then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          selectElement.add(new Option(response.data[i].comm_create));
        }
      });
    }, []);
    // functions to track inputs of community and post desc
    function communityDrop(e) {
      setName(e.target.value);
    }

    function communityPost(e) {
      setNewComm(e.target.value);
    }

    function descriptionVal(e) {
      setDescription(e.target.value);
    }

    // posts to the database and refreshes the page
    function postToComm() {
      axios.post("http://localhost:3001/createPost", {
        title,
        description,
        poster,
        date,
        comm_name,
    }).then(() => {
      window.location.reload(false);
    });
  }

  function createCommunity() {
    axios.post("http://localhost:3001/createCommunity", {
      comm_create,
      postlist
  }).then((response) => {
    console.log(response)
    var selectElement = document.getElementById('communityDrop');
    selectElement.add(new Option(response.data.comm_create));
  });
  }


  return (
    <div className='feed-container'>
        <nav>
            <div className='nav-background-container'>
                <div className='nav-container'>
                  <Link className='logo-link' to='/'>boroughs</Link>
                  <div className='search-bar'>
                      <input type='search' placeholder='Search Boroughs'></input>
                  </div>

                  <div className='s-button'>
                    <Link className='profile-link' to='/profile'>Profile</Link>
                  </div>
                </div>
            </div>
        </nav>

        <div className='feed-content'>
            <div className='side1'>
                <div className='profile-corner'>
                </div>
            </div>
            <div className='center'>

                <div className='user-post'>
                    <div className='post-text'>
                        <div className='pfp'>
                            <div className='pfp-circle'>
                            </div>
                        </div>
                        <div className='textbox'>
                            <input type='text' placeholder='Create Post' onChange={descriptionVal} /*onClick={openModal}*/></input>
                        </div>
                    </div>

                    <div className='post-options'>
                        <div className='option-container'>
                            <select id='communityDrop' className='community-select' onChange={communityDrop} defaultValue={'Community'}>
                              <option value="Community" disabled>Select a Community</option>
                            </select>
                            <button onClick={postToComm}>Post</button>
                        </div>
                    </div>

                </div>
                <div className='posts'>
                    {postlist.map((post) => {
                        return <Post key={post._id} post={post} />;
                    })}
                </div>
            </div>
            <div className='side2'>
              <div className='community-tab'>
                <div className='create-comm'>
                  <h1>Create Community</h1>
                  <div className='create-comm-options'>
                    <h3>name</h3>
                      <input type='text' placeholder='Community Name' onChange={communityPost}></input>
                      <button onClick={createCommunity}>Create Community</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className='footer-space'>
          
        </div>
    </div>
  )
}
