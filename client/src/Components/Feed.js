import React, {useEffect, useState} from 'react'
import axios from 'axios';
import './Feed.css';
import Post from './Subcomponents/Posts';
import Navbar from './Subcomponents/Navbar';

export default function Feed() {

    const [comm_create, setNewComm] = useState('');
    const [postlist, setList] = useState([]);
    
    var user;

    useEffect(() => {
      const logged = localStorage.getItem("user");
      if (logged) {
        user = logged;
        axios.get("http://localhost:3001/getFeed").then((response) => {
          setList(response.data);
        });
      }
      else {
        window.location.href = 'http://localhost:3000/login';
      }
    }, []);

    function communityPost(e) {
      setNewComm(e.target.value);
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
        <div className='navbar-import'>
          <Navbar />
        </div>

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
                            <input type='text' placeholder='Create Post' onClick={() => {window.location.href = 'http://localhost:3000/createPost'}} readOnly></input>
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
