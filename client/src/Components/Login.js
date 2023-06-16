import React, {useState} from 'react';
import axios from 'axios';
import './Login.css';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setName] = useState('');
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState('');

    const [text, setText] = useState('Login');

    function loginUser() {
        axios.get("http://localhost:3001/getUser").then((response) => {
            if(response.data === "Hi") {
                window.location.href = 'http://localhost:3000/';
            }
        })
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
  )
}
