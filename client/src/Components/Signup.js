import React, {useState} from 'react';
import axios from 'axios';
import './Signup.css';

export default function Signup() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setName] = useState('');
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState('');

    const [text, setText] = useState('Sign Up');

    function createUser() {
        axios.post("http://localhost:3001/createUser", {
            fullname,
            age,
            username,
            password,
            email
    });
    }

  return (
    <div className='register-container'>
        <form className='register-form'>
            <label htmlFor='username'>Username</label>
            <input type="text" placeholder="Username" onChange={(event) => {
            setUsername(event.target.value);
            }}/>

            <label htmlFor='password'>Password</label>
            <input type="text" placeholder="Password" onChange={(event) => {
            setPassword(event.target.value);
            }}/>

            <label htmlFor='age'>Age</label>
            <input type="number" placeholder="Age" onChange={(event) => {
            setAge(event.target.value);
            }}/>

            <label htmlFor='fullname'>Fullname</label>
            <input type="text" placeholder="Fullname" onChange={(event) => {
            setName(event.target.value);
            }}/>

            <label htmlFor='email'>Email</label>
            <input type="text" placeholder="Email" onChange={(event) => {
            setEmail(event.target.value);
            }}/>
        </form>
        <div>
          <button onClick={createUser}> Register </button>
        </div>
    </div>
  )
}
