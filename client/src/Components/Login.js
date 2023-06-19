import React, {useState} from 'react';
import axios from 'axios';
import './Login.css';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function loginUser() {
      axios.post("http://localhost:3001/loginUser", {
        username,
        password
    }).then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = 'http://localhost:3000/feed';
    });
  }

  return (
    <div className='login_container'>
        <form className='login-form'>
            <label htmlFor='username'>Username</label>
            <input type="text" placeholder="Username" onChange={(event) => {
            setUsername(event.target.value);
            }}/>

            <label htmlFor='password'>Password</label>
            <input type="text" placeholder="Password" onChange={(event) => {
            setPassword(event.target.value);
            }}/>
        </form>
        <div>
          <button onClick={loginUser}> Register </button>
        </div>
    </div>
  );
}
