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
    <div id='signupauth' className="Auth-form-container">
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="firstname"
              id='input1'
              className="form-control mt-1"
              placeholder="Enter First Name"
              onChange={(event) => {
                setFirst(event.target.value);
            }}/>
          </div>

          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              type="lastname"
              id='input1'
              className="form-control mt-1"
              placeholder="Enter Last Name"
              onChange={(event) => {
                setLast(event.target.value);
            }}/>
          </div>

          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              id='input1'
              className="form-control mt-1"
              placeholder="Enter Email"
              onChange={(event) => {
                setEmail(event.target.value);
            }}/>
          </div>

          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="username"
              id='input1'
              className="form-control mt-1"
              placeholder="Enter Username"
              onChange={(event) => {
                setUsername(event.target.value);
            }}/>
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter Password"
              onChange={(event) => {
                setPassword(event.target.value);
            }}/>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={createUser}>
              Register
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            <br></br>
          </p>
        </div>
      </div>
    </div>
  )
}
