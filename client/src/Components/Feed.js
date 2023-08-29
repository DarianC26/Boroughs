import React, {useEffect, useRef, useState} from 'react'
import io from "socket.io-client";
import axios from 'axios';
import './Feed.css';
import Post from './Subcomponents/Posts';
import Navbar from './Subcomponents/Navbar';
import image1 from './images/viewersbackground.svg';
import image2 from './images/boardgames.svg';

export default function Feed() {

    const [comm_create, setNewComm] = useState('');
    const [postlist, setList] = useState([]);
    const total = useRef(5);
    const length = useRef(0);
    var socket;
    
    const [user, setUser] = useState('');

    useEffect(() => {
      const logged = localStorage.getItem("user");
      if (logged) {
        setUser(JSON.parse(logged));
        axios.get('http://localhost:3001/getFeed', {params: {total: total.current}}).then((response) => {
          setList(response.data);
        });
      }
      else {
        window.location.href = 'http://localhost:3000/login';
      }

      socket = io.connect("http://localhost:8800");
      socket.emit("add-user", JSON.parse(logged).username);
      return () => {
        socket.disconnect();
      };

    }, []);

    useEffect(() => {
  
  }, []);

    useEffect(() => {
      length.current = postlist;
    }, [postlist]);

    useEffect(() => {
      window.addEventListener("scroll", e => {
        if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
          axios.get('http://localhost:3001/getFeed', {params: {total: total.current+5}}).then((response) => {
              setList(response.data);
              if (total.current > length.current.length) {
                total.current = length.current.length;
                console.log(total.current, length.current.length);
                return
              }
              else {
                total.current = (total.current+5);
              }
          });
        }
      })
    }, [])

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
    <div className='background-color-container'>
        <div className='feed-container'>
            <div className='navbar-import'>
              <Navbar />
            </div>

        <div className='thebiggest'>
        <div className='feed-content'>
            <div className='side1'>
                <div className='profile-corner'>
                  <p>Profile</p>
                  <p>{user.username}</p>
                </div>
                <div className='page-select-tab'>
                  <a href="#">Home</a>
                  <a href="#">Explore</a>
                  <a href="#">Notifications</a>
                  <a href="#">Messages</a>
                  <a href="#">Saved</a>
                  <a href="#">Friends</a>
                  <a href="#">Settings</a>
                </div>
                <img className='place-at-left-bottom' src={image2}></img>
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
              <img className='place-at-bottom' src={image1}></img>
            </div>

        </div>
        </div>


        <div className='footer-space'>
        </div>
    </div>
    </div>
  )
}
