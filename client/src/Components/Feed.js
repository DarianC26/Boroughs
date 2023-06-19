import React, {useState} from 'react'
import axios from 'axios';
import './Feed.css';
import Navbar from './Subcomponents/Navbar';

export default function Feed() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('may');
    const [poster, setPoster] = useState('daniel');
    const [comm_name, setName] = useState('nba');
    const [category, setCategory] = useState('sports');
    const [postlist, setList] = useState([]);

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
        <Navbar />
        <div className='feed-content'>
            <div className='side1'>
                <div className='profile-corner'>
                </div>
            </div>
            <div className='center'>
                <div className='posts'>
                    <div className='login_container'>
                        <form className='login-form'>
                            <label htmlFor='username'>Username</label>
                            <input type="text" placeholder="Username" onChange={(event) => {
                            setTitle(event.target.value);
                            }}/>

                            <label htmlFor='password'>Password</label>
                            <input type="text" placeholder="Password" onChange={(event) => {
                            setDescription(event.target.value);
                            }}/>
                        </form>
                        <div>
                            <button onClick={postToComm}> Create Post </button>
                        </div>
                        <div>
                            <button onClick={createCommunity}> Create Community </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='side2'></div>
        </div>
    </div>
  )
}
