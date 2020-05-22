import React from "react";
import { Redirect, withRouter } from "react-router-dom";

import Selfie from "../svg/selfie.jpg";
import Profile1 from "../svg/profile1.png";
import Profile2 from "../svg/profile2.png";
import Profile3 from "../svg/profile3.png";
import Profile4 from "../svg/profile4.png";
import LikeBtn from "../svg/like-bttn.svg";
import axios from "axios";
import "../css/profile.css";

const Profile  = ({ appUser, setAppUser }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [Newusername, setNewUsername] = React.useState("");
  const [error, setError] = React.useState("");
  const [usertype, setUserType] = React.useState("");
  const [profileNum, setProfileNum] = React.useState("");
  const [redirect, setRedirect] = React.useState("");

  const deleteUser = () => {
    console.log(appUser);
    console.log(password);
    const body = {
      username: appUser,
      password: password,
    };
    axios.post('/api/deleteUser', body)
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
        setError("Failed to delete");
      });
      alert("User deleted.")
      if(appUser){
        setAppUser(null)
        setRedirect(true);
       }
  };

  const changeName = () => {
    console.log(appUser);
    console.log(Newusername);
    const body = {
      username: appUser,
      password: Newusername,
    };
    axios.post('/api/changeusername', body)
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
        setError("Failed to change");
      });
      alert("Username Changed.")
      if(appUser){
        setAppUser(null)
        setRedirect(true);
       }
  };

  const changepassword = () => {
    console.log(appUser);
    console.log(password);
    const body = {
      username: appUser,
      password: password,
    };
    axios.post('/api/changepassword', body)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          console.log("yeah password is changed!");
          setAppUser(username);
          
        } else {
          setError(res.data.error);
        }
      })
      .catch(() => {
        setError("Failed to change");
      });

      alert("Password Changed.")
      if(appUser){
        setAppUser(null)
        setRedirect(true);
       }
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/' />
    }
  }

  const logout = () => {
    if(appUser){
      setAppUser(null)
      setRedirect(true);
     }
  }

  const profilePic = () => {
    axios.post('/api/profilePic', appUser)
        .then((res) => {
            console.log(res.data);
            setProfileNum(res.data);
        })
        .catch(console.log);

    switch (profileNum) {
        case 0:
            return Profile1
        case 1:
            return Profile2
        case 2:
            return Profile3
        default:
            return Profile4
    }
}

  return (
    <div>
{renderRedirect()}
      <div className="flexContainerRow">
        <div className="flexBox-1">
          <br />
          <br />
          <div
            // id="signInBox"
            // className="AccountBox centerBoxH flexContainerCol fontRobotoMono"
          >
            <div className="flexBox-2">
            <img id="user-profile-image" src={profilePic()} alt="" />
            {appUser && <h5 id="username">{appUser}<br />
          <br /></h5>}
            <p class="centerText">Username:
                <input className="username-input inputText" value={appUser} onChange={(e) => setUsername(e.target.value)} />
              </p>
              <p class="centerText">New Username:
                <input className="password-input inputText"  value={Newusername} onChange={(e) => setNewUsername(e.target.value)} />
              </p>
              <p class="centerText">New Password:
                <input className="password-input inputText" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </p>
              <p class="centerText">
              <button class="fontRobotoMono" onClick={deleteUser}>Delete User</button>
              </p>
              <p class="centerText">
              <button class="fontRobotoMono" onClick={changeName}>Change Username</button>
              </p>
              <p class="centerText">
              <button class="fontRobotoMono" onClick={changepassword}>Change Password</button>
              </p>
              <p class="centerText">
              <button class="fontRobotoMono" onClick={logout}>Logout</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
