import React, {useState} from 'react';
import axios from 'axios';
import './Signup.css';

export default function Signup() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirst] = useState('');
    const [lastName, setLast] = useState('');
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState('');

    const [text, setText] = useState('Sign Up');

    function createUser() {
        axios.post("http://localhost:3001/createUser", {
            firstName,
            lastName,
            age,
            username,
            password,
            email
    }).then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.reload();
      window.location.href = 'http://localhost:3000/login';
    }).catch((response) => {
      console.log(response.response.status);
      alert("This username or email is already in use");
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

            <label htmlFor='firstName'>First Name</label>
            <input type="text" placeholder="First Name" onChange={(event) => {
            setFirst(event.target.value);
            }}/>

            <label htmlFor='lastName'>Last Name</label>
            <input type="text" placeholder="Last Name" onChange={(event) => {
            setLast(event.target.value);
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
