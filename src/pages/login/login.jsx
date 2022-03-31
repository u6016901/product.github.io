import '../../App.css';

import React, { useState, useEffect  } from 'react';
import logoImg from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

<Link to="/about">About</Link>
 
function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(false);

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    let  payload = {
        Username : username,
        Password : password,
    }

    axios.post("https://arr-dev.azurewebsites.net/api/v1/login/login", payload)
    .then((res) => {
      window.sessionStorage.setItem("token", res.data.data.token)
      window.sessionStorage.setItem("username", payload.Username)
      window.sessionStorage.setItem("password", payload.Password)
      
      history.push("/roomManagement")
      setAlert(false)
    })
    .catch((res) => {
      setAlert(true)
    });
  }

  return (
    <div className="login_container">
      <form class="login_form" onSubmit={handleSubmit}>
          <img class="login_logo" src={logoImg}></img>
          <input
            onChange={event => setUsername(event.target.value)}
            value={username}
            required
            id="username"
            name="Username"
            placeholder="         Username"
          />
          <input
            required
            onChange={event => setPassword(event.target.value)}
            value={password}
            type="password"
            id="password"
            name="Password"
            placeholder="        Password"
          />
          <button>Sign In</button>
          <div class="login_wrong">
          {alert && <p> Wrong Username or Password</p>}
          </div>
      </form>
    </div>
  );
}
 
export default Login;