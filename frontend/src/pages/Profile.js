import React from 'react';
import { Redirect } from 'react-router-dom';

import Selfie from '../svg/selfie.jpg';
import Profile1 from '../svg/profile1.png';
import Profile2 from '../svg/profile2.png';
import Profile3 from '../svg/profile3.png';
import Profile4 from '../svg/profile4.png';
import LikeBtn from '../svg/like-bttn.svg';
import axios from 'axios';


const Profile = ({ appUser, setAppUser }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [usertype, setUserType] = React.useState('');
 
    return (
      <div>
          <h1>Profile</h1>
      </div>
    );
  };

export default Profile;