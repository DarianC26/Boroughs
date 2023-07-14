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
      window.location.reload();
      window.location.href = 'http://localhost:3000/feed';
    }).catch((response) => {
      console.log(response);
    });
  }

  return (
    <div id='loginauth'className="Auth-form-container">
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
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
              placeholder="Enter password"
              onChange={(event) => {
                setPassword(event.target.value);
            }}/>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={loginUser}>
              Login
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            <br></br>
          </p>
        </div>
      </div>
    </div>
  );
}
