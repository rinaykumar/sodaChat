import React from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
// import 'The Chat' Logo 
import headerLogo from '../svg/chat-header.svg';
// import sample chatroom video
import video from '../videos/video.mp4';
import "../css/login_signup.css";

const Signup = ({ appUser, setAppUser }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleAuth = () => {
    const body = {
      username: username,
      password: password,
    };
    axios.post('/api/register', body)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          console.log("Worked!");
          setAppUser(username);
        } else {
          setError(res.data.error);
        }
      })
      .catch(() => {
        setError("Failed to register");
      });
  };

  if (appUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="background">
      <video id='sampleVideo' autoPlay loop muted>
        <source src={video} type='video/mp4' />
      </video>
      <div className="flexContainerRow">
        {/* ======== Sign Up Box - [LEFT] ======== */}
        <div className="flexBox-1">
          {/* <img id="headerLogo" src={headerLogo} alt="Logo" /> */}
          <br />
          <br />
          <div id="signUpBox" className="AccountBox centerBoxH flexContainerCol fontRobotoMono">
            {/* Nav in the top-right */}
            {/* <div className="flexBox-1">
              <p id="AccountBttn" className="smallFontSz">
                <Link className="links" to="/">Sign In</Link>
              </p>
            </div> */}
            {/* sign in contents */}
            <div className="flexBox-2">
              {/* Header */}
              <h1 id="header-signIn-signup" class="centerText"><em>sodaChat</em></h1>
              {/* error message */}
              <div id="error">
                {error && <strong>{error}</strong>}
              </div>
              {/* Start of Login Form (requires Username & Password) */}

              <p className="usernameText">Username:
                <input className="username-input inputText" value={username} onChange={(e) => setUsername(e.target.value)} required="required" />
              </p>
              <p className="passwordText">Password:
                <input className="password-input inputText" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required="required" />
              </p>
              <p className="centerText retypeText">Confirm PW:
                <input className="retype-input inputText" type="password" required="required" />
              </p>
              <p className="checkboxText conditionsText">
                <input className="conditionsBttn" type="checkbox" required="required" />I accept the Terms of Service and Privacy Policy
              </p>
              <button id="submitBttn" class="fontRobotoMono" disabled={!username || !password} onClick={handleAuth}>Sign up</button>
              <div>
                <p id="AccountBttn" className="smallFontSz"><Link className="links" to="/">Log In</Link></p>
              </div>
            </div>
          </div>
        </div>
        {/* ======== Sample Chatroom Video - [RIGHT] ======== */}

      </div>
    </div>
  );
};

export default Signup;
