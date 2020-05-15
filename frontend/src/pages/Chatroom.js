import React from 'react';
import { Redirect } from 'react-router-dom';
import '../css/chatroom.css';
import Selfie from '../svg/selfie.jpg';
import Profile1 from '../svg/profile1.png';
import Profile2 from '../svg/profile2.png';
import Profile3 from '../svg/profile3.png';
import Profile4 from '../svg/profile4.png';
import LikeBtn from '../svg/like-bttn.svg';
import axios from 'axios';

const ws = new WebSocket('ws://localhost:1234/ws');

const Chatroom = ({ appUser, setAppUser, totalUsers, setTotalUsers}) => {
    // const [totalUsers, setTotalUsers] = React.useState(0);
    const [message, setMessage] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const [profileNum, setProfileNum] = React.useState('');
    // const [users ,setUsers] = React.useEffect([]);

    // Setting username for testing until login auth is implemented
    //setAppUser('user');

    const fetchMessages = () => {
        axios.get('/api/getAllMessages')
            .then((res) => {
                console.log(res);
                setMessages(res.data.messages);
            })
            .catch(console.log);
    };

    const ScrollMessages = ({ messages }) => {
        const lastMessageRef = React.useRef(null);
        const scrolltoBottom = () => {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start', duration: 10000 });
        }
        React.useEffect(scrolltoBottom, [messages]);
        return (
            <div ref={lastMessageRef} />
        );
    }
     
    React.useEffect(() => {
        fetchMessages()
        console.log('Got the mesage');
        // do something when component mounts
        ws.addEventListener('message', fetchMessages);
        return () => ws.removeEventListener('message', fetchMessages);
      });
      
    const profilePic = () => {
        axios.post('/api/profilePic', appUser)
            .then((res) => {
                // console.log(res.data);
                setProfileNum(res.data);
            })
            .catch(console.log);

        switch (profileNum) {
            case 1:
                return Profile1
            case 2:
                return Profile2
            case 3:
                return Profile3
            default:
                return Profile4
        }
    }

    const submitMessage = () => {
        console.log("From submitMessage");
        console.log(message);
        // console.log(appUser);
        // addUsers(appUser)
        ws.send(message)
        // ws.send(appUser);
        setMessage('')
        const body = {
            text: message,
            user: appUser
        };
        // ws.send(body.text);
        axios.post('/api/addMessage', body)
            .then(() => setMessage(''))
            .then(() => fetchMessages())
            .catch(console.log);
    };

    // const addUsers = (user) => {
    //     if(user !== appUser){
    //     const newUser = user;
    //    const newUsers = [...users, newUser];
        
    //   setUsers(newUsers)
    //   const totalUserCount = newUsers.length;
    //   setTotalUsers(totalUserCount)}
    //   return totalUsers
    // }


    const parseText = (message) => {
        let obj = JSON.parse(message);
        return obj.text;
    }
    const parseUser = (message) => {
        let obj = JSON.parse(message);
        return obj.user;
    }

    const parseDate = (message) => {
        let obj = JSON.parse(message);
        return obj.date;
    }

    const logoutUser = () => {
        if(appUser){
        setAppUser(null)
        setTotalUsers(totalUsers - 1)
       }
        return <Redirect to="/" />
    }

    React.useEffect(() => {
        fetchMessages();
    }, []);

    if (!appUser) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <div class="flexbox">
                <div id="sidebar">
                    <div id="dismiss">
                        <i class="fas fa-arrow-left"></i>
                    </div>
                    <div class="left-menu-bar">
                        <div class="menu-profile-info">
                            <img id="user-profile-image" src={profilePic()} alt="" />
                            {appUser && <h5 id="username">{appUser}</h5>}
                        </div>
                        <div>
                    <header class="user-counter"> Total Users LoggedIn: {totalUsers}</header>
                    </div>
                        <div class="bottom-buttons">
                            <button class="menu-buttons" id="profile-bttn" type="button" name="profile">PROFILE</button>
                            <button class="menu-buttons" id="logout-bttn" type="button" name="logout" onClick={logoutUser}>LOGOUT</button>
                        </div>
                    </div>
                </div>
                <div id="content">
                    <button type="button" id="sidebarCollapse" class="btn btn-info">
                        <i class="fas fa-align-left"></i>
                    </button>
                    <div class="right-chatroom">
                        <div class="messages-box">
                            <div class="submitted-message">
                                <div class="submitted-message-box-1">
                                    <img class="submitted-message-image" src={Selfie} alt="" />
                                </div>
                                <div class="submitted-message-box-2">
                                    <div class="message-content-header">
                                        <h5 id="username-content">User Name 1</h5>
                                        <p id="date-content">May 5, 2020, 9:25:23 PM</p>
                                    </div>
                                    <div class="message-content-text">
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                            laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                        <button id="like-button" type="button" name="like-button">
                                            <img id="thumbs-up" src={LikeBtn} alt="" />
                                            <p id="thumbs-up-count">0</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {messages.map((message) => {
                                return (
                                    <div class="submitted-message">
                                        <div class="submitted-message-box-1">
                                            <img class="submitted-message-image" src={profilePic()} alt="" />
                                        </div>
                                        <div class="submitted-message-box-2">
                                            <div class="message-content-header">
                                                <h5 id="username-content">{parseUser(message)}</h5>
                                                <p id="date-content">{parseDate(message)}</p>
                                            </div>
                                            <div class="message-content-text">
                                                <p>{parseText(message)}</p>
                                                <button id="like-button" type="button" name="like-button">
                                                    <img id="thumbs-up" src={LikeBtn} alt="" />
                                                    <p id="thumbs-up-count">0</p>
                                                </button>
                                            </div>
                                        </div>
                                        <ScrollMessages messages={messages} />
                                    </div>
                                );
                            })}
                        </div>

                        <div class="send-messages-box">
                            <input id="send-message-input" placeholder="Message #general" name="message" value={message} onChange={e => setMessage(e.target.value)}></input>
                            <button id="send-message-button" type="button" name="send-message" onClick={submitMessage}>SEND</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="overlay"></div>
        </div>
    );
}

export default Chatroom;
