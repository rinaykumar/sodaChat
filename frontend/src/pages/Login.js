import React from 'react';
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom';
// import 'The Chat' Logo 
import headerLogo from '../svg/chat-header.svg';
// import sample chatroom video
import video from '../videos/video.mp4';
import "../css/login_signup.css";
// import Chatroom from './Chatroom';

const Login = ({ appUser, setAppUser, totalUsers, setTotalUsers }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [usertype, setUserType] = React.useState('');


  const handleLogIn = () => {
    console.log(username)
    console.log(password)

    const body = {
      username: username,
      password: password,
    }
    
    axios.post('/api/authenticate', body)
      .then((res) => {
        if (res.data.success || res.data.usertype) {
          console.log('Worked')
          setAppUser(username)
          setUserType(res.data.usertype)
          // setTotalUsers(totalUsers + 1)
        }
        else {
          //auth error
          setError(res.data.error)

        }
        console.log(error)
      })
      .catch(() => {
        setError('Failed to authenticate')
      })
  }

React.useEffect(()=> {
  if(appUser)
  return setTotalUsers(totalUsers + 1)
}, [])

console.log(totalUsers)


  if (appUser) {
    return <Redirect to="/chatroom" />;
  }

  return (

    <div className="background">
      <video id='sampleVideo' autoPlay loop muted>
        <source src={video} type='video/mp4' />
      </video>
      <div className="flexContainerRow">
        {/* ======== Sign In Box - [LEFT] ======== */}
        <div className="flexBox-1">
          {/* <img id="headerLogo" src={headerLogo} alt="Logo" /> */}
          <br />
          <br />
          <div id="signInBox" className="AccountBox centerBoxH flexContainerCol fontRobotoMono">
            {/* Nav in the top-right */}
            {/* <div className="flexBox-1">
              <p id="AccountBttn" class="smallFontSz">
                <Link className="links" to="/signup">Sign Up</Link>
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
              <br />
              {/* Start of Login Form (requires Username & Password) */}
              <p class="centerText">Username:
                <input className="username-input inputText" value={username} onChange={(e) => setUsername(e.target.value)} />
              </p>
              <p class="centerText">Password:
                <input className="password-input inputText" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </p>
              {/* <p id="resetPsswd" class="smallFontSz"><a class="links" href="#">Forgot Password?</a>
              </p> */}
              <button id="submitBttn" class="fontRobotoMono" disabled={!username || !password} onClick={handleLogIn}>Log in</button>
              <br />
              <p id="AccountBttn" class="smallFontSz"><Link className="links" to="/signup">Sign Up</Link></p>
            </div>
          </div>
        </div>
        {/* ======== Sample Chatroom Video - [RIGHT] ======== */}
      </div>
    </div>
  );
};
export default Login;

