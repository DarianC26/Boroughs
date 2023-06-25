import React, {useEffect, useState} from 'react'
import axios from 'axios';
import './Feed.css';

export default function Feed() {

    const [title, setTitle] = useState('zion');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('may');
    const [poster, setPoster] = useState('dave');
    const [comm_name, setName] = useState('nba');
    const [category, setCategory] = useState('sports');
    const [postlist, setList] = useState([]);
    
    var user;

    useEffect(() => {
      const logged = localStorage.getItem("user");
      if (logged) {
        user = logged;
        axios.get("http://localhost:3001/createPost")
      }
      else {
        window.location.href = 'http://localhost:3000/login';
      }
    }, [])

    function categoryVal(e) {
      setDescription(e.target.value);
    }

    function descriptionVal(e) {
      setCategory(e.target.value);
    }

    function postToComm() {
      axios.post("http://localhost:3001/createPost", {
        title,
        description,
        poster,
        date,
        comm_name,
        category
    }).then((response) => {
      console.log(response);
    });
  }

  function createCommunity() {
    axios.post("http://localhost:3001/createCommunity", {
      comm_name,
      category,
      postlist
  }).then((response) => {
    console.log(response);
  });
}

  return (
    <div className='feed-container'>
        <nav>
            <div className='nav-background-container'>
                <div className='nav-container'>
                  <p>boroughs</p>
                  <div className='search-bar'>
                      <i className='uil uil-search'></i>
                      <input type='search' placeholder='Search Boroughs'></input>
                  </div>

                  <div className='s-button'>
                      <a href='https://localhost:3000/profile'>Profile</a>
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
                            <input type='text' placeholder='Create Post' onChange={descriptionVal}></input>
                        </div>
                    </div>
                    <div className='post-options'>
                        <div className='option-container'>
                          <input type='text' placeholder='Category' onChange={categoryVal}></input>
                          <button onClick={postToComm}> Register </button>
                        </div>
                    </div>
                </div>
                <div className='posts'>

                </div>
            </div>
            <div className='side2'></div>
        </div>
    </div>
  )
}
